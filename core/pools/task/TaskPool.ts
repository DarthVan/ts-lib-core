/* Generated with TypeScript snippets */

import { ArrayPool } from "../ArrayPool";
import { ITask } from "./ITask";

/** TaskPool **
* ...
* @Author Sith
* @Created 2020-10-25
*/

export class TaskPool extends ArrayPool<ITask> {

	private _autoExecute: boolean;
	private _busy: boolean;
	private _onAllComplete: () => void;
	private _onAllProgress: (data: any) => void;
	private _total: number;
	private _skipBusyState: boolean;
	private _tasksInProgress: number;

	constructor(autoExecute: boolean = false, skipBusyState: boolean = false) {
		super();
		this._autoExecute = autoExecute;
		this._skipBusyState = skipBusyState;
		this._tasksInProgress = 0;
		this._busy = false;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		while (this._array.length > 0)
			this._array.pop().destroy(); // can be bug here?
		super.destroy();
	}

	public override add(object: ITask): void {
		super.add(object);
		if (this._autoExecute)
			this.execute();
	}

	public execute(onAllComplete?: () => void, onAllProgress?: (data: any) => void): void {
		this._onAllComplete = onAllComplete;
		this._onAllProgress = onAllProgress;
		if (this._autoExecute && (this._onAllComplete || this._onAllProgress))
			throw new Error(<any>this.constructor.name + ": can't assign onAllComplete or onAllProgress in auto-execute mode!");
		if (this._busy)
			return;
		this._total = this._array.length;
		if (this._skipBusyState) {
			for (let i = 0; i < this._total; i++)
				this.next();
			return;
		} else this._busy = true;
		this.next();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private next(doneTask?: ITask): void {
		if (doneTask) {
			if (this._onAllProgress) {
				this._onAllProgress({
					id: doneTask.id,
					done: this._total - (this._skipBusyState ? this._tasksInProgress - 1 : this._array.length),
					total: this._total
				});
			}
			doneTask.destroy();
			this._tasksInProgress--;
		}
		if (this._array.length > 0) {
			let task: ITask = this._array.shift();
			(task as any).nextTask = this.next.bind(this);
			task.execute();
			this._tasksInProgress++;
		} else {
			this._busy = false;
			if (this._onAllComplete && this._tasksInProgress == 0)
				this._onAllComplete();
		}
	}
}