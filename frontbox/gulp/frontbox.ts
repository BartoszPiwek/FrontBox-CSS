import { watch } from 'gulp'
import { Gulpclass, Task } from 'gulpclass/Decorators'
import { IFrontboxConfig, IFrontboxTask } from './interface'

const argv = require('yargs').argv

export const getMode: string = argv.prod ? 'prod' : 'dev'
export const websiteDestinationPath: string = `public/${getMode}`

@Gulpclass()
export abstract class AbstractFrontboxGulpTask {
	public tasks = {}
	public concatTasks = {}
	public configTask: IFrontboxConfig[]

	public destinationPath: string
	public canConcatFiles: boolean

	constructor(configTask: IFrontboxConfig[], params?: IFrontboxTask) {
		this.configTask = configTask

		this.destinationPath = websiteDestinationPath

		if (params) {
			Object.assign(this, params)
		}
	}

	public async asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array)
		}
	}

	public async loopTasks(fun: Function) {
		await this.asyncForEach(this.configTask, async v => {
			await fun(v)
		})
	}

	public createTasks(fun: Function) {
		this.configTask.forEach(v => {
			this.tasks[v.name] = async () => {
				return await fun(v)
			}
		})
	}

	@Task()
	public watch(prefix: string) {
		this.configTask.forEach(element => {
			const taskFunction = async done => {
				await this.tasks[element.name]()
				done()
			}

			Object.assign(taskFunction, {
				displayName: `${prefix}${element.name.charAt(0).toUpperCase() +
					element.name.slice(1)}`,
			})

			watch(element.watch, taskFunction)
		})
	}

	protected abstract task(element: IFrontboxConfig): void
	protected taskProd?(element: IFrontboxConfig): void

	protected abstract start(): void
	protected startProd?(): void
}
