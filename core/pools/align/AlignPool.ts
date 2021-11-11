/* Generated with TypeScript snippets */

import { MapPool } from "../MapPool";
import { IAlignGroup } from "./IAlignGroup";

/** AlignPool **
* ...
* @Author Sith
* @Created 2021-01-29
*/

export class AlignPool extends MapPool<IAlignGroup> {

	/* constructor() {
		super();
	} */

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._map.forEach(element => {
			element.destroy();
			element = null;
		});
		this._map = null;
	}

	public updateX(): void {
		this._map.forEach(element => {
			element.updateX();
		});
	}

	public updateY(): void {
		this._map.forEach(element => {
			element.updateY();
		});
	}

	public update(): void {
		this.updateX();
		this.updateY();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}