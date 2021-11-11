/* Generated with TypeScript snippets */


/** ITask **
* ...
* @Author Sith
* @Created 2020-10-25
*/

export interface ITask {

	readonly id: string;

	execute(): void;
	destroy(): void;

	// Optional methods
	onStart(f: () => void): ITask;
	onProgress(f: (data: any) => void): ITask;
	onComplete(f: (data?: any) => void): ITask;
	onError(f: (message?: string) => void): ITask;

}