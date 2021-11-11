/* Generated with TypeScript snippets */

import { Loader } from "pixi.js";
import { Task } from "../../pools/task/Task";
import { TaskPool } from "../../pools/task/TaskPool";
import { AssetList } from "../list/AssetList";
import { AssetBundle } from "../type/AssetBundle";
import { IAsset } from "../type/IAsset";
import { UnpackBundleTask } from "./UnpackBundleTask";

/** LoadTask **
* ...
* @Author Sith
* @Created 2020-10-26
*/

export class LoadTask extends Task {

	protected _map: Map<string, AssetList>;

	protected _loadableArray: Array<{ asset: IAsset, listID: string }>;
	protected _bundlesArray: Array<IAsset>;

	private _onLoadCompleteID: any; //Loader.ICallbackID;
	private _onLoadProgressID: any;
	private _onLoadErrorID: any;

	private _unpackedBundlesNum: number;
	private _unpackBundlesTaskPool: TaskPool;

	constructor(id: string, map: Map<string, AssetList>) {
		super(id);
		this._map = map;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._map = null;
		this._loadableArray.forEach(asset => {
			asset = null;
		}); // Is it needed ??
		this._loadableArray = null;
		this._bundlesArray = null;
	}

	public override execute(): void {
		super.execute();

		this._unpackedBundlesNum = 0;

		// 0. make union map
		this._loadableArray = new Array<{ asset: IAsset, listID: string }>();
		this._bundlesArray = new Array<IAsset>();

		// 1. filter and ignore assets with data != null;
		// 2. sort {bundleID, entyID} assets and skip them
		// 3. fill Loader and load url assets
		this.findAssets();

		// 4. load
		this._onLoadCompleteID = Loader.shared.onComplete.add(this.onLoadComplete, this);
		this._onLoadProgressID = Loader.shared.onProgress.add(this.onLoadProgress, this);
		this._onLoadErrorID = Loader.shared.onError.add(this.onLoadError, this);

		Loader.shared.load();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	protected findAssets(): void {
		this._map.forEach(list => {
			list.map.forEach(asset => {
				if (!asset.data && asset.source) { // CUZ MAY BE NO-URL ASSETS
					this._loadableArray.push({ asset: asset, listID: list.id });
					Loader.shared.add(asset.id, asset.source.url, { xhrType: asset.source.xhr });
					if (asset instanceof AssetBundle)
						this._bundlesArray.push(asset);
				}
			});
		});
	}

	private onLoadComplete(): void {
		this.deattachListeners();

		// 5. assign data
		this._loadableArray.forEach(obj => {
			this._map.get(obj.listID).get(obj.asset.id).data = Loader.shared.resources[obj.asset.id].data;
		});

		Loader.shared.reset();

		// 6. parse zip bundles...
		this._unpackBundlesTaskPool = new TaskPool();
		this._bundlesArray.forEach(bundle => {
			this._unpackBundlesTaskPool.add(new UnpackBundleTask('Unpack Bundle ' + bundle.id, bundle, this._map)
				.onProgress(this.onBundleProgress.bind(this)));
		});
		this._unpackBundlesTaskPool.execute(this.onUnpackComplete.bind(this), this.onUnpackProgress.bind(this));
	}

	private onLoadProgress(): void {
		if (this._onProgress)
			this._onProgress({
				action: 'loading: ' + Loader.shared.progress + ' %',
				value: Loader.shared.progress
			});
	}

	private onLoadError(error?: Error): void {
		// TODO: unpack tasks have no ERROR HANDLERS !!!1111
		this.deattachListeners(); // todo: do something with this ?
		this.failed(error.message);
	}

	private onUnpackProgress(data: any): void {
		this._unpackedBundlesNum = data.done;
		if (this._onProgress)
			this._onProgress({
				taskID: data.id,
				action: 'unpacked bundles: ' + data.done + ' / ' + data.total,
				value: (data.done / data.total) * 100
			});
	}

	private onBundleProgress(data: any): void {
		if (this._onProgress)
			this._onProgress({
				taskID: data.id,
				action: 'unpacking bundle ' + (this._unpackedBundlesNum + 1) + '/' + this._bundlesArray.length +
					': asset ' + data.done + '/' + data.total,
				value: (this._unpackedBundlesNum / this._bundlesArray.length + (data.done / data.total) / this._bundlesArray.length) * 100
			});
	}

	private onUnpackComplete(): void {
		this._unpackBundlesTaskPool.destroy();
		this.success(null);
	}

	private deattachListeners(): void {
		Loader.shared.onComplete.detach(this._onLoadCompleteID);
		Loader.shared.onProgress.detach(this._onLoadProgressID);
		Loader.shared.onError.detach(this._onLoadErrorID);
	}
}