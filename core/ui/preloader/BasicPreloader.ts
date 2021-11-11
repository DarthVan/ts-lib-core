/* Generated with TypeScript snippets */

import { Sound } from "@pixi/sound";
import { Sprite, Texture } from 'pixi.js';
import { BasicProgressBar } from "../bar/BasicProgressBar";
import { IUiInput } from "../IUiInput";
import { UiComponent } from "../UiComponent";
import { IPreloader } from './IPreloader';

/** BasicPreloader **
* ...
* @Author Sith
* @Created 2021-04-02
*/

export class BasicPreloader extends UiComponent<IUiInput> implements IPreloader {

	protected _background: Sprite;
	protected _bar: BasicProgressBar;

	constructor(input: IUiInput) {
		super(input);
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		super.destroy();

		this._background.destroy({ texture: true, baseTexture: true });
		this._bar.destroy();
	}

	public override resize(size?: { w: number, h: number }): void {
		this._background.width = size?.w;
		this._background.height = size?.h;
	}

	public override show(): void {
		super.show();

		this._bar.activate();
	}

	public override hide(): void {
		super.hide();

		this._bar.reset();
		this._bar.deactivate();
	}

	public showProgress(data: { progress?: number, info?: string }): void {
		this._bar.showProgress(data);
	}

	public showError(message?: string): void {
		this._bar.showError(message);
	}

	public showTip(text: string): void {

	}

	public showBackground(texture?: Texture): void {
		if (this._background)
			this._background.destroy({ texture: true, baseTexture: true });

		if (texture) {
			this._background = new Sprite(texture);
		} else {
			const canvas: HTMLCanvasElement = document.createElement('canvas');
			const size: number = 8;
			canvas.width = size;
			canvas.height = size;
			const context: CanvasRenderingContext2D = canvas.getContext('2d');
			context.fillStyle = '#000000CC';
			context.fillRect(0, 0, size, size);
			this._background = new Sprite(Texture.from(canvas));
		}

		this._background.width = this._input.width;
		this._background.height = this._input.height;

		this.addChildAt(this._background, 0);
	}

	public setSound(sound: Sound): void {

	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		this.showBackground();
		this.getBounds(true); // careful with canvas texture, its still 64x64 !!
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}