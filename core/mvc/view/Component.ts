/* Generated with TypeScript snippets */

import { Container } from 'pixi.js';

/** Component **
* ...
* @Author Sith
* @Created 2021-01-12
*/

export class Component extends Container {

	constructor() {
		super();
		this.name = <any>this.constructor.name;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		super.destroy({ children: false, texture: false, baseTexture: false });
	}

	public resize(size?: { w: number, h: number }): void {
		/* this._alignRect.width = size?.w;
		this._alignRect.width = size?.h; */

		/* App.current.renderer.width;
		App.current.renderer.height; */
	}

	// todo: make service
	/* public migrateTo(container: PIXI.Container, keepScreenPosition: boolean = false): void {
		if (container == null)
			throw new Error(<any>this.constructor.name + ": target container is undefined!");

		if (keepScreenPosition) {
			// TODO: do convertation coordinates
		} else
			container.addChild(this);
	} */

	// todo: remove? there is ".pivot" property
	/* public movePivotPiont(x: number, y: number): void {
		for (let i = 0; i < this.children.length; i++) {
			let displayObject: PIXI.DisplayObject;
			displayObject = this.getChildAt(i);
			displayObject.x -= x;
			displayObject.y -= y;
		}
		this.x += x;
		this.y += y;

		//if (snapRect == null)
		//	return;
		//snapRect.x += x;
		//snapRect.y += y;
	} */

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}