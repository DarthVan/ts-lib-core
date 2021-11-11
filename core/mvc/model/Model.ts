/* Generated with TypeScript snippets */

import { utils } from 'pixi.js';

/** Model **
* ...
* @Author Sith
* @Created 2021-01-12
*/

export class Model extends utils.EventEmitter {

	constructor() {
		super();
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public destroy(): void {

	}

	public onUpdate(): void {

	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected onValueUpdate(): void {
		this.emit('paramUpdated');
		this.on('paramUpdated', () => { }, this);
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}