/* Generated with TypeScript snippets */

import { Sound } from "@pixi/sound";
import { addPixiEnvironment } from "../../utils/Utils";
import { BasicWorker, startWorker } from "../BasicWorker";
import { WorkerMessage } from "../WorkerMessage";

/** AssetUnpacker **
* ...
* @Author Sith
* @Created 2021-02-13
*/

export class AssetUnpacker extends BasicWorker {

	private readonly _methods: Map<string, (data?: any) => any>;

	constructor() {
		super();

		this._methods = new Map<string, (data?: any) => any>([
			['png', this.unpackPNG.bind(this)],
			['mp3', this.unpackMP3.bind(this)]
		]);
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override addLibs(): void {
		addPixiEnvironment();
		self.importScripts('/bin/js/libs/pixi.min.js', '/bin/js/libs/pixi-sound.js', '/bin/js/libs/upng.min.js');
	}

	protected override onData(taskID: number, data: { type: string, buffer: ArrayBuffer }): void {
		self.postMessage(WorkerMessage.onComplete(taskID, this._methods.get(data.type)(data.buffer)));
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private unpackPNG(data: ArrayBuffer): ArrayBuffer {
		return UPNG.toRGBA8(UPNG.decode(data))[0];
	}

	private unpackMP3(data: ArrayBuffer): Sound {
		console.log(document.createElement("audio").canPlayType('mp3')); // not supported in web workers suka!
		return Sound.from(data);
	}
}

startWorker(AssetUnpacker);