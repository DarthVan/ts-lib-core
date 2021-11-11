/* Generated with TypeScript snippets */

import { Asset } from "./Asset";
import { Sound } from "@pixi/sound";

/** SoundAsset **
* ...
* @Author Sith
* @Created 2020-10-24
*/

export class SoundAsset extends Asset {

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override clear(): void {
		(this._data as Sound).destroy();
		super.clear();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	/* protected init(): void {

	} */
}