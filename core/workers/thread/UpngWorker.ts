/* Generated with TypeScript snippets */

import { BasicWorker, startWorker } from "../BasicWorker";
import { WorkerMessage } from "../WorkerMessage";


/** UpngWorker **
* ...
* @Author Sith
* @Created 2020-12-21
*/

export class UpngWorker extends BasicWorker {

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override addLibs(): void {
		self.importScripts('/bin/js/libs/upng.min.js');
	}

	protected override onData(taskID: number, data: any): void {
		self.postMessage(WorkerMessage.onComplete(taskID, UPNG.toRGBA8(UPNG.decode(data))[0]));
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}

startWorker(UpngWorker);