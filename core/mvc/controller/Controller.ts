/* Generated with TypeScript snippets */

import { DisplayObject } from "pixi.js";

/** Controller **
* ...
* @Author Sith
* @Created 2021-01-12
*/

export class Controller {

	protected _view: DisplayObject;

	constructor(view: DisplayObject, ...args: any[]) {
		this._view = view;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public destroy(): void {
		this.disable();
		this._view = null;
	}

	public enable(): void {

	}

	public disable(): void {

	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}