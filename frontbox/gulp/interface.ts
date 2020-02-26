export interface IFrontboxConfig {
  name: string;
  files: string;
  dest: string;
  watch: string[];
  concatWith?: string;
}

export interface IFrontboxTask {
  destinationPath?: string;
  includePrefix?: boolean;
  canConcatFiles?: boolean;
}