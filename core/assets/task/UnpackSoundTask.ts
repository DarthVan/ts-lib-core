/* Generated with TypeScript snippets */

import { Sound } from "@pixi/sound";
import { getFileFolder } from "../../utils/Utils";
import { SoundAsset } from "../type/SoundAsset";
import { UnpackAssetTask } from "./UnpackAssetTask";

/** UnpackSoundTask **
* ...
* @Author Sith
* @Created 2020-11-19
*/

export class UnpackSoundTask extends UnpackAssetTask {

	private _json: any;

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._json = null;
		super.destroy();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	protected override unpack(): void {
		if ((this._params.file as string).split('.')[1] == 'json')
			this._zip.file(this._params.file).async("string").then(this.onUnpacked.bind(this));
		else
			this._zip.file(this._params.file).async("arraybuffer").then(this.onUnpacked.bind(this));
	}

	protected override onUnpacked(data: any): void {
		if (data instanceof ArrayBuffer) {
			this.addAssetAndComplete(Sound.from(data));
			return;
		}

		this._json = JSON.parse(data);
		this._zip.file(getFileFolder(this._params.file) + this._json.sound).async("arraybuffer").then(this.onSound.bind(this));
	}

	private onSound(data: ArrayBuffer): void {
		const sound: Sound = Sound.from(data);
		sound.addSprites(this._json.sprites);

		this.addAssetAndComplete(sound);
	}

	private addAssetAndComplete(data: any): void {
		const asset: SoundAsset = new SoundAsset(this._params.id);
		asset.data = data;
		this.getList().add(asset);

		this.success();
	}

}