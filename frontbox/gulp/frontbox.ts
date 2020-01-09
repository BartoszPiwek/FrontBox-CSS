const argv = require("yargs").argv;

export const getMode: string = argv.prod ? "prod" : "dev";
export const websiteDestinationPath: string = `public/${getMode}`;

export interface IFrontboxInitTaks {
	destinationPath?: string;
	includePrefix?: boolean;
	canConcatFiles?: boolean;
}

export abstract class FrontboxTaskAbstract {
	public tasks = {};
	public concatTasks = {};

	public destinationPath: string;
	public includePrefix: boolean;
	public canConcatFiles: boolean;

	constructor() {
		this.includePrefix = true;
	}
}
