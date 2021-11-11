/* Generated with TypeScript snippets */

import { WorkerMessageType } from "./WorkerMessageType";

/** WorkerMessage **
* ...
* @Author Sith
* @Created 2020-11-26
*/

export class WorkerMessage {

	public readonly type: WorkerMessageType;
	public readonly id: number;
	public readonly data: any;

	constructor(type: WorkerMessageType, id: number, data?: any) {
		this.type = type;
		this.id = id;
		this.data = data;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public static onData(taskID: number, data: any): WorkerMessage {
		return new WorkerMessage(WorkerMessageType.SET_DATA, taskID, data);
	}

	public static onStart(taskID: number, data?: any): WorkerMessage {
		return new WorkerMessage(WorkerMessageType.ON_START, taskID, data);
	}

	public static onProgress(taskID: number, data?: any): WorkerMessage {
		return new WorkerMessage(WorkerMessageType.ON_PROGRESS, taskID, data);
	}

	public static onComplete(taskID: number, data?: any): WorkerMessage {
		return new WorkerMessage(WorkerMessageType.ON_COMPLETE, taskID, data);
	}

	public static onError(taskID: number, data?: any): WorkerMessage {
		return new WorkerMessage(WorkerMessageType.ON_ERROR, taskID, data);
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}