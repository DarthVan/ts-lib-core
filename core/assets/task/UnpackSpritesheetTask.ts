/* Generated with TypeScript snippets */

import { MIPMAP_MODES, SCALE_MODES, Spritesheet, Texture } from "pixi.js";
import { getFileFolder } from "../../utils/Utils";
import { Workers } from "../../workers/Workers";
import { SpriteSheetAsset } from "../type/SpriteSheetAsset";
import { UnpackAssetTask } from "./UnpackAssetTask";

/** UnpackSpritesheetTask **
* ...
* @Author Sith
* @Created 2020-11-12
*/

export class UnpackSpritesheetTask extends UnpackAssetTask {

	private _json: any;
	private _sheet: Spritesheet;

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._json = null;
		this._sheet = null;
		super.destroy();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override onUnpacked(data: string): void {
		this._json = JSON.parse(data);
		/* meta.image; meta.size.w; meta.size.h */
		this._zip.file(getFileFolder(this._params.file) + this._json.meta.image).async("arraybuffer").then(this.onTexture.bind(this));
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private onTexture(data: ArrayBuffer): void {
		if (Workers.isBoxActive('UPNG')) {
			Workers.addTask('UPNG', data).onComplete(this.onPNGUncompress.bind(this));
			return;
		}
		this.onPNGUncompress(UPNG.toRGBA8(UPNG.decode(data))[0]);
	}

	private onPNGUncompress(data: ArrayBuffer): void {
		this._sheet = new Spritesheet(
			Texture.fromBuffer(
				new Uint8Array(data), this._json.meta.size.w, this._json.meta.size.h,
				{ scaleMode: SCALE_MODES.LINEAR, mipmap: MIPMAP_MODES.ON }
			), this._json
		);
		this._sheet.parse(this.onParse.bind(this));
	}

	private onParse(): void {
		const asset: SpriteSheetAsset = new SpriteSheetAsset(this._params.id);
		asset.data = this._sheet;
		this.getList().add(asset);

		this.success();
	}
}