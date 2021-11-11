/* Generated with TypeScript snippets */

import { ITask } from "./ITask";

/** Task **
* ...
* @Author Sith
* @Created 2020-10-25
*/

export class Task implements ITask {

	public readonly id: string;

	protected _onStart: () => void;
	protected _onProgress: (data: any) => void;
	protected _onComplete: (data?: any) => void;
	protected _onError: (message?: string) => void;

	constructor(id: string) {
		this.id = id;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public destroy(): void {
		this._onStart = null;
		this._onProgress = null;
		this._onComplete = null;
		this._onError = null;
		//console.log('Destroy ' + this.id + ' !');
	}

	public execute(): void {
		if (this._onStart)
			this._onStart();
		//console.log('Started ' + this.id + ' ...');
		//this.success(this.id + ' task has completed!');
	}

	public onStart(f: () => void): ITask {
		this._onStart = f;
		return this;
	}

	public onProgress(f: (data: any) => void): ITask {
		this._onProgress = f;
		return this;
	}

	public onComplete(f: (data?: any) => void): ITask {
		this._onComplete = f;
		return this;
	}

	public onError(f: (message?: string) => void): ITask {
		this._onError = f;
		return this;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	protected success(data?: any): void {
		//console.log(this.id + " : completed!");
		if (this._onComplete)
			this._onComplete(data);
		this.startNextTask();
	}

	protected failed(message?: string): void {
		if (this._onError)
			this._onError(message);
		else
			throw new Error(<any>this.constructor.name + ': ' + message);
		this.startNextTask();
	}

	private startNextTask(): void {
		if ((this as any).nextTask)
			(this as any).nextTask(this);
	}
}