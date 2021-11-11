/* Generated with TypeScript snippets */

import { Task } from "../../pools/task/Task";
import { TaskPool } from "../../pools/task/TaskPool";
import { AssetList } from "../list/AssetList";
import { AssetType } from "../type/AssetType";
import { IAsset } from "../type/IAsset";
import { UnpackAssetTask } from "./UnpackAssetTask";
import { UnpackSoundTask } from "./UnpackSoundTask";
import { UnpackSpritesheetTask } from "./UnpackSpritesheetTask";
import { UnpackTextureTask } from "./UnpackTextureTask";

/** UnpackBundleTask **
* ...
* @Author Sith
* @Created 2020-11-05
*/

export class UnpackBundleTask extends Task {

	private _bundle: IAsset;
	private _map: Map<string, AssetList>;
	private _taskPool: TaskPool;
	private _zip: JSZip;

	constructor(id: string, bundle: IAsset, map: Map<string, AssetList>) {
		super(id);
		this._bundle = bundle;
		this._map = map;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._bundle = null;
		this._map = null;
		this._taskPool = null;
		this._zip = null;
		super.destroy();
	}

	public override execute(): void {
		super.execute();

		new JSZip().loadAsync(this._bundle.data).then((z: JSZip) => {
			(this._zip = z).file("bundle.json").async("string").then(this.onBundleListUnpacked.bind(this));
		});
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private onBundleListUnpacked(s: string): void {
		const data: any = JSON.parse(s);
		const verion: string = data.version;
		const bundleList: Array<any> = data.files;

		this._taskPool = new TaskPool(false, true);

		bundleList.forEach(params => {
			switch (params.type) {
				default:
					this._taskPool.add(new UnpackAssetTask('Unpack String: ' + params.id, this._zip, params, this._map));
					break;
				case AssetType.TEXTURE:
					this._taskPool.add(new UnpackTextureTask('Unpack Texture: ' + params.id, this._zip, params, this._map));
					break;
				case AssetType.SPRITESHEET:
					this._taskPool.add(new UnpackSpritesheetTask('Unpack Spritesheet: ' + params.id, this._zip, params, this._map));
					break;
				case AssetType.SOUND:
					this._taskPool.add(new UnpackSoundTask('Unpack Sound: ' + params.id, this._zip, params, this._map));
					break;
			}
		});

		this._taskPool.execute(this.onAssetsUnpacked.bind(this), this._onProgress);
	}

	private onAssetsUnpacked(): void {
		this.success();
	}
}