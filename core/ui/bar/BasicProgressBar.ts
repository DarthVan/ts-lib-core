/* Generated with TypeScript snippets */

import { Sprite, TilingSprite } from "pixi.js";
import { IUiInput } from "../IUiInput";
import { BasicLabel } from "../label/BasicLabel";
import { UiComponent } from "../UiComponent";

/** BasicProgressBar **
* ...
* @Author Sith
* @Created 2021-04-02
*/

export class BasicProgressBar extends UiComponent<IUiInput> {

	protected _background: Sprite;
	protected _tiledFill: TilingSprite;
	protected _fillMask: Sprite;
	protected _info: BasicLabel;
	protected _style: any;

	constructor(input: IUiInput) {
		super(input);
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._background.destroy({ texture: true, baseTexture: true }); // or not destroy textures ??
		this._tiledFill.destroy({ texture: true, baseTexture: true });
		this._fillMask.destroy({ texture: true, baseTexture: true });
		this._info.destroy();
		this._style = null;
	}

	public override reset(): void {
		this._fillMask.scale.x = 0.0;
	}

	public showProgress(data: { progress?: number, info?: string }): void {
		if (data.progress)
			this._fillMask.scale.x = data.progress;
		if (data.info)
			this._info.text = data.info;
	}

	public showError(message?: string): void {
		if (this._info)
			this._info.text = message;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}