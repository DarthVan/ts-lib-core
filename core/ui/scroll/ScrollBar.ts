/* Generated with TypeScript snippets */

import { Graphics } from "pixi.js";
import { IUiInput } from "../IUiInput";
import { UiComponent } from "../UiComponent";

/** ScrollBar **
* ...
* @Author Sith
* @Created 2021-06-09
*/

export class ScrollBar extends UiComponent<IUiInput> {

	private _bar: Graphics;
	//private _handle:ScrollHandle;

	private _relation: number;
	private _isHorizontal: boolean;

	constructor(input: IUiInput) {
		super(input);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override destroy(): void {
		super.destroy();
	}

	public get relation(): number {
		return this._relation;
	}

	public set relation(value: number) {
		this._relation = value;
		// redraw / recalculate
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._relation = 0.5;

		this._input.width > this._input.height ? this.drawHorizontal() : this.drawVertical();


	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private drawHorizontal(): void {
		this._isHorizontal = true;


	}

	private drawVertical(): void {
		this._isHorizontal = false;

	}

}