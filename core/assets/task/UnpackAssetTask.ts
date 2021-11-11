/* Generated with TypeScript snippets */

import { Task } from "../../pools/task/Task";
import { AssetList } from "../list/AssetList";
import { Asset } from "../type/Asset";
import { AssetType } from "../type/AssetType";

/** UnpackAssetTask **
* ...
* @Author Sith
* @Created 2020-11-11
*/

export class UnpackAssetTask extends Task {

	protected _params: any;
	protected _map: Map<string, AssetList>;
	protected _zip: JSZip;

	constructor(id: string, zip: JSZip, params: any, map: Map<string, AssetList>) {
		super(id);
		this._zip = zip;
		this._params = params;
		this._map = map;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._zip = null;
		this._params = null;
		this._map = null;
		super.destroy();
	}

	public override execute(): void {
		super.execute();

		this.unpack();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected unpack(): void {
		this._zip.file(this._params.file).async("string").then(this.onUnpacked.bind(this));
	}

	protected onUnpacked(data: any): void {
		const asset: Asset = new Asset(this._params.id);
		asset.data = this._params.type == AssetType.JSON ? JSON.parse(data) : data;
		this.getList().add(asset);

		this.success();
	}

	protected getList(): AssetList {
		let assetList: AssetList;

		if (!this._params.list)
			assetList = this._map.get('Default');
		else {
			assetList = this._map.get(this._params.list);
			if (!assetList) {
				assetList = new AssetList(this._params.list);
				this._map.set(assetList.id, assetList);
			}
		}

		return assetList;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}