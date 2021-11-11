/* Generated with TypeScript snippets */

import { CodeProgressBar } from "../bar/CodeProgressBar";
import { BasicPreloader } from "./BasicPreloader";

/** CodePreloader **
* ...
* @Author Sith
* @Created 2021-04-02
*/

export class CodePreloader extends BasicPreloader {

	/* constructor() {
		super();
	} */

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	/* public destroy(): void {
		super.destroy();
	} */

	public override resize(size?: { w: number, h: number }): void {
		super.resize(size);

		this._bar.x = (size.w - this._bar._bounds.getRectangle().width) / 2;
		this._bar.y = (size.h - this._bar._bounds.getRectangle().height) / 2;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._bar = new CodeProgressBar({ color: this._input.color, width: 400, height: 30 });
		this.addChild(this._bar);
		this._bar.x = (this._input.width - this._bar._bounds.getRectangle().width) / 2;
		this._bar.y = (this._input.height - this._bar._bounds.getRectangle().height) / 2;

	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}