/* Generated with TypeScript snippets */

import { Texture } from "pixi.js";
import { Asset } from "./Asset";

/** TextureAsset **
* ...
* @author Sith
* @created 2020-10-18
*/

export class TextureAsset extends Asset {

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override clear(): void {
		(this._data as Texture).destroy(true);
		super.clear();
	}

}