/* Generated with TypeScript snippets */

import { LoaderResource } from "pixi.js";
import { Asset } from "./Asset";

/** ZipAsset **
* ...
* @Author Sith
* @Created 2020-10-23
*/

export class ZipAsset extends Asset {

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		if (this._source.url)
			this._source.xhr = LoaderResource.XHR_RESPONSE_TYPE.BUFFER;
	}
}