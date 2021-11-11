/* Generated with TypeScript snippets */

import { MIPMAP_MODES, SCALE_MODES, Texture } from "pixi.js";
import { Workers } from "../../workers/Workers";
import { TextureAsset } from "../type/TextureAsset";
import { UnpackAssetTask } from "./UnpackAssetTask";

/** UnpackTextureTask **
* ...
* @Author Sith
* @Created 2020-11-11
*/

export class UnpackTextureTask extends UnpackAssetTask {

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override unpack(): void {
		this._zip.file(this._params.file).async("arraybuffer").then(this.onUnpacked.bind(this));
	}

	protected override onUnpacked(data: ArrayBuffer): void {
		if (Workers.isBoxActive('UPNG')) {
			Workers.addTask('UPNG', data).onComplete(this.onPNGUncompress.bind(this));
			return;
		}
		/* some png's have more than 1 frame, so use first frame only [0] */
		this.onPNGUncompress(UPNG.toRGBA8(UPNG.decode(data))[0]);
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private onPNGUncompress(data: ArrayBuffer): void {
		const asset: TextureAsset = new TextureAsset(this._params.id);
		asset.data = Texture.fromBuffer(
			new Uint8Array(data), this._params.data.w, this._params.data.h,
			{ scaleMode: SCALE_MODES.LINEAR, mipmap: MIPMAP_MODES.ON }
		);
		this.getList().add(asset);

		this.success();
	}
}