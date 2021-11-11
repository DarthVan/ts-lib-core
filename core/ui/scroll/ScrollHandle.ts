/* Generated with TypeScript snippets */

import { Graphics } from "pixi.js";
import { BasicButton } from "../button/BasicButton";
import { IButtonInput } from "../button/IButtonInput";

/** ScrollHandle **
* ...
* @Author Sith
* @Created 2021-06-12
*/

export class ScrollHandle extends BasicButton {

	constructor(input: IButtonInput) {
		super(input);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override destroy(): void {
		super.destroy();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._normal = new Graphics();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}