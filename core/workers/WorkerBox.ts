/* Generated with TypeScript snippets */

import { WorkerCallBack } from "./WorkerCallBack";
import { WorkerMessage } from "./WorkerMessage";
import { WorkerMessageType } from "./WorkerMessageType";
import { WorkerThreadsNum } from "./WorkerThreadsNum";

/** WorkerBox **
* ...
* @Author Sith
* @Created 2020-12-02
*/

export class WorkerBox {

	private readonly _js: string;
	private readonly _multithreading: boolean;
	private readonly _taskArray: Array<{ id: number, data: any, callBacks: WorkerCallBack }>;
	private readonly _workers: Array<{ worker: Worker, task?: { id: number, callBacks: WorkerCallBack } }>;
	private readonly _handlers: Map<WorkerMessageType, (id: number, data?: any) => void>;

	private _onResponse: (e: MessageEvent) => void;
	private _n: number;

	constructor(js: string, multithreading: boolean) {
		this._js = js;
		this._multithreading = multithreading;

		this._onResponse = this.onWorkerResponse.bind(this);

		this._handlers = new Map<WorkerMessageType, (id: number, data?: any) => void>([
			[WorkerMessageType.ON_START, this.onStart.bind(this)],
			[WorkerMessageType.ON_PROGRESS, this.onProgress.bind(this)],
			[WorkerMessageType.ON_COMPLETE, this.onComplete.bind(this)],
			[WorkerMessageType.ON_ERROR, this.onError.bind(this)],
		]);

		this._n = 0;

		this._workers = new Array<{ worker: Worker, task?: { id: number, callBacks: WorkerCallBack } }>();
		this.addWorker();

		this._taskArray = new Array<{ id: number, data: any, callBacks: WorkerCallBack }>();
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public destroy(): void {
		this.removeAllWorkers();
	}

	public addTask(data: any): WorkerCallBack {
		const workerCallBack: WorkerCallBack = new WorkerCallBack();
		this._taskArray.push({ id: this.n, data: data, callBacks: workerCallBack });
		setTimeout(this.executeNextTask.bind(this), 0);
		return workerCallBack;
	}

	public cancel(): void {
		this._n = 0;
		this.removeAllWorkers();
		this.addWorker();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private executeNextTask(): void {
		if (!this._taskArray.length)
			return;

		let workerObj: { worker: Worker, task?: { id: number, callBacks: WorkerCallBack } };

		// 1. get worker from existed workers
		for (let i: number = 0; i < this._workers.length; i++) {
			if (!this._workers[i].task) {
				workerObj = this._workers[i];
				break;
			}
		}

		// 2. if multithreads allowed, trying to add a new worker
		if (!workerObj && this._multithreading)
			workerObj = this.addWorker();

		// 3. if found free worker, processing next task
		if (workerObj) {
			let task: { id: number, data: any, callBacks: WorkerCallBack } = this._taskArray.shift();
			workerObj.task = { id: task.id, callBacks: task.callBacks }
			workerObj.worker.postMessage(WorkerMessage.onData(task.id, task.data));
		}

		//console.log('executeNextTask: workers num:', this._workers.length);
	}

	private onWorkerResponse(e: MessageEvent): void {
		const message: WorkerMessage = e.data || e;

		const handler: (id: number, data?: any) => void = this._handlers.get(message.type);
		if (!handler)
			throw new Error(<any>this.constructor.name + ': unknown message received!');

		handler(message.id, message.data);
	}

	private onStart(taskID: number, data?: any): void {
		this.getCallBack(taskID)?.start();
	}

	private onProgress(taskID: number, data?: any): void {
		this.getCallBack(taskID)?.progress(data);
	}

	private onComplete(taskID: number, data?: any): void {
		this.getCallBack(taskID, true)?.complete(data);
		this.executeNextTask();
		this.removeFreeWorkers();
		//console.log('after removing free workers are:', this._workers.length);
	}

	private onError(taskID: number, data?: any): void {
		this.getCallBack(taskID)?.error(data);
		this.removeFreeWorkers();
	}

	private addWorker(): { worker: Worker, task?: { id: number, callBacks: WorkerCallBack } } {
		if (WorkerThreadsNum.CURRENT >= WorkerThreadsNum.MAX && this._workers.length > 0)
			return null;
		WorkerThreadsNum.CURRENT++;
		const worker: Worker = new Worker(this._js);
		worker.addEventListener("message", this._onResponse);
		return this._workers[this._workers.push({ worker: worker, task: null }) - 1];
	}

	private removeWorker(workerObj: { worker: Worker, task?: { id: number, callBacks: WorkerCallBack } }): void {
		workerObj.worker.removeEventListener("message", this._onResponse);
		workerObj.worker.terminate();
		workerObj?.task?.callBacks.destroy();
		WorkerThreadsNum.CURRENT--;
	}

	private removeFreeWorkers(): void {
		if (this._workers.length <= 1 || !this._multithreading)
			return;

		for (let i: number = this._workers.length - 1; i >= 0; i--) {
			if (!this._workers[i].task) {
				this.removeWorker(this._workers.splice(i, 1)[0]);
				if (this._workers.length <= 1)
					break;
			}
		}
	}

	private removeAllWorkers(): void {
		this._taskArray.splice(0, this._taskArray.length);
		this._workers.forEach(workerObj => {
			this.removeWorker(workerObj);
		});
		this._workers.splice(0, this._workers.length);
	}

	private getCallBack(taskID: number, resetTaskReference: boolean = false): WorkerCallBack {
		for (let i: number = 0; i < this._workers.length; i++) {
			if (!this._workers[i].task)
				continue;
			if (this._workers[i].task.id == taskID) {
				const callBack: WorkerCallBack = this._workers[i].task.callBacks;
				if (resetTaskReference)
					this._workers[i].task = null;
				return callBack;
			}
		}
		return null;
	}

	private get n(): number {
		if (this._n < 1000)
			return this._n += 1;
		return this._n = 0;
	}
}