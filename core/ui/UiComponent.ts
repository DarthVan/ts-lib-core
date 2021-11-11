/* Generated with TypeScript snippets */

import { Component } from "../mvc/view/Component";
import { IUiInput } from "./IUiInput";

/** UiComponent **
* ...
* @Author Sith
* @Created 2021-04-02
*/

export class UiComponent<T extends IUiInput> extends Component {

	protected readonly _input: T;

	constructor(input: T) {
		super();

		this._input = input;

		this.init();
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	/* public override destroy(): void {
		
	} */

	public override resize(size?: { w: number, h: number }): void {
		if (size?.w)
			this._input.width = size.w;
		if (size?.h)
			this._input.height = size.h;
	}

	public show(): void {
		this.visible = true;
	}

	public hide(): void {
		this.visible = false;
	}

	public activate(): void {
		this.interactive = true;
	}

	public deactivate(): void {
		this.interactive = false;
	}

	public reset(): void {

	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected init(): void {
		this.defaults();
	}

	protected defaults(): void {
		this._input.width ??= 200;
		this._input.height ??= 50;
		this._input.color ??= 0x7777FF;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}