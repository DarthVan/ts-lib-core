/* Generated with TypeScript snippets */

import { Loader } from "pixi.js";
import { AssetList } from "../list/AssetList";
import { AssetBundle } from "../type/AssetBundle";
import { IAsset } from "../type/IAsset";
import { LoadListTask } from "./LoadListTask";

/** LoadAssetTask **
* ...
* @Author Sith
* @Created 2020-10-26
*/

export class LoadAssetTask extends LoadListTask {

	private _assetID: string;

	constructor(id: string, map: Map<string, AssetList>, listID: string, assetID: string) {
		super(id, map, listID);
		this._assetID = assetID;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._assetID = null;
		super.destroy();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	protected override findAssets(): void {
		const list: AssetList = this._map.get(this._listID);
		if (!list)
			throw new Error(<any>this.constructor.name + ': AssetList ' + this._listID + ' undefined!');
		const asset: IAsset = list.get(this._assetID);
		if (!asset)
			throw new Error(<any>this.constructor.name + ': Asset ' + asset.id + ' undefined!');
		if (!asset.data && asset.source) { // CUZ MAY BE NO-URL ASSETS
			this._loadableArray.push({ asset: asset, listID: this._listID });
			Loader.shared.add(asset.id, asset.source.url, { xhrType: asset.source.xhr });
			if (asset instanceof AssetBundle)
				this._bundlesArray.push(asset);
		}
	}
}