/* Generated with TypeScript snippets */

import { WorkerBox } from "./WorkerBox";
import { WorkerCallBack } from "./WorkerCallBack";
import { WorkerThreadsNum } from "./WorkerThreadsNum";

/** Workers **
* ...
* @Author Sith
* @Created 2020-11-27
*/

export class Workers {

	protected static _boxMap: Map<string, WorkerBox>;

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public static init(maxThreads?: number) {
		WorkerThreadsNum.MAX = maxThreads ? maxThreads : navigator.hardwareConcurrency;
		WorkerThreadsNum.CURRENT = 0;
		this._boxMap = new Map<string, WorkerBox>();

		this.addBox('UPNG', 'js/workers/upng.js', true);

		console.log('Workers system initialized.');
	}

	public static addBox(boxID: string, js: string, multithreading: boolean = false): void {
		if (this.isBoxActive(boxID))
			throw new Error(<any>this.constructor.name + ': box ' + boxID + ' already exists!');
		this._boxMap.set(boxID, new WorkerBox(js, multithreading));
	}

	public static removeBox(boxID: string): void {
		if (!this.isBoxActive(boxID))
			throw new Error(<any>this.constructor.name + ': box ' + boxID + ' undefined!');
		this._boxMap.get(boxID)?.destroy();
		this._boxMap.delete(boxID);
	}

	public static cancelBox(boxID: string): void {
		if (!this.isBoxActive(boxID))
			throw new Error(<any>this.constructor.name + ': box ' + boxID + ' undefined!');
		this._boxMap.get(boxID)?.cancel();
	}

	public static addTask(boxID: string, data: any): WorkerCallBack {
		if (!this.isBoxActive(boxID))
			throw new Error(<any>this.constructor.name + ': box ' + boxID + ' undefined!');
		return this._boxMap.get(boxID)?.addTask(data);
	}

	public static isBoxActive(boxID: string): boolean {
		return this._boxMap.get(boxID) ? true : false;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}