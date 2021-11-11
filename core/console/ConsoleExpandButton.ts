/* Generated with TypeScript snippets */

import { Graphics } from "pixi.js";
import { IUiInput } from "../ui/IUiInput";
import { UiComponent } from "../ui/UiComponent";

/** ConsoleExpandButton **
* ...
* @Author Sith
* @Created 2021-05-11
*/

export class ConsoleExpandButton extends UiComponent<IUiInput> {

	private _arrow: Graphics;
	private _minimize: () => void;
	private _maximize: () => void;

	constructor(color: number, minimize: () => void, maximize: () => void) {
		super({ color: color, width: 20, height: 20 }); // why width and height ???????
		this._minimize = minimize;
		this._maximize = maximize;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this.off('click', this.onClick);

		this._arrow.destroy();
		this._arrow = null;

		this._minimize = null;
		this._maximize = null;
	}

	public showAsMaximized(): void {
		this._arrow.scale.y = -1;
	}

	public showAsMinimized(): void {
		this._arrow.scale.y = 1;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._arrow = new Graphics();
		this._arrow.beginFill(this._input.color, 0.01);
		this._arrow.drawRect(-12, -8, 24, 16);
		this._arrow.endFill();
		this._arrow.beginFill(this._input.color);
		this._arrow.moveTo(0, 4);
		this._arrow.lineTo(8, -4);
		this._arrow.lineTo(-8, -4);
		this._arrow.lineTo(0, 4);
		this._arrow.endFill();
		this.addChild(this._arrow);

		this.interactive = true;
		this.buttonMode = true;

		this.on('click', this.onClick);
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private onClick(): void {
		this._arrow.scale.y == 1 ? this._maximize() : this._minimize();
	}
}