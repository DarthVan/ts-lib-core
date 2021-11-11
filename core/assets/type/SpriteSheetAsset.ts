/* Generated with TypeScript snippets */

import { Spritesheet } from "pixi.js";
import { Asset } from "./Asset";

/** SpriteSheetAsset **
* ...
* @Author Sith
* @Created 2020-10-24
*/

export class SpriteSheetAsset extends Asset {

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override clear(): void {
		(this._data as Spritesheet).destroy(true);
		super.clear();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}