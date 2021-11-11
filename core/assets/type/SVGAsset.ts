/* Generated with TypeScript snippets */

import { SVGResource } from "pixi.js";
import { Asset } from "./Asset";

/** SVGAsset **
* ...
* @Author Sith
* @Created 2021-03-03
*/

export class SVGAsset extends Asset {

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override clear(): void {
		(this._data as SVGResource).destroy();
		super.clear();
	}

}