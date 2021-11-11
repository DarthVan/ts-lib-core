/* Generated with TypeScript snippets */

import { Loader } from "pixi.js";
import { AssetList } from "../list/AssetList";
import { AssetBundle } from "../type/AssetBundle";
import { LoadTask } from "./LoadTask";

/** LoadListTask **
* ...
* @Author Sith
* @Created 2020-11-19
*/

export class LoadListTask extends LoadTask {

	protected _listID: string;

	constructor(id: string, map: Map<string, AssetList>, listID: string) {
		super(id, map);
		this._listID = listID;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._listID = null;
		super.destroy();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	protected override findAssets(): void {
		const list: AssetList = this._map.get(this._listID);
		if (!list)
			throw new Error(<any>this.constructor.name + ': AssetList ' + this._listID + ' undefined!');
		list.map.forEach(asset => {
			if (!asset.data && asset.source) { // CUZ MAY BE NO-URL ASSETS
				this._loadableArray.push({ asset: asset, listID: this._listID });
				Loader.shared.add(asset.id, asset.source.url, { xhrType: asset.source.xhr });
				if (asset instanceof AssetBundle)
					this._bundlesArray.push(asset);
			}
		});
	}
}