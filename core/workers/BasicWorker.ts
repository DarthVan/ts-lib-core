/* Generated with TypeScript snippets */

import { WorkerMessage } from "./WorkerMessage";
import { WorkerMessageType } from "./WorkerMessageType";

/** BasicWorker **
* ...
* @Author Sith
* @Created 2020-11-25
*/

export class BasicWorker {

	constructor() {
		this.addLibs();
		self.addEventListener("message", this.onMessageReceived.bind(this));
		//console.log(<any>this.constructor.name, 'started.');
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected addLibs(): void {
		//self.importScripts('/bin/js/pixi.min.js', '/bin/js/jszip.min.js');
	}

	protected onData(taskID: number, data: any): void {

	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private onMessageReceived(e: MessageEvent): void {
		const message: WorkerMessage = e.data || e;
		if (message.type != WorkerMessageType.SET_DATA)
			throw new Error(<any>this.constructor.name + ': unknown message received!');
		this.onData(message.id, message.data);
	}

}

export function startWorker(workerClass: typeof BasicWorker): void {
	let worker: BasicWorker = new workerClass();
}