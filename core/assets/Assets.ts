/* Generated with TypeScript snippets */

import { Sound } from "@pixi/sound";
import { Loader, Spritesheet, Texture } from "pixi.js";
import { ITask } from "../pools/task/ITask";
import { TaskPool } from "../pools/task/TaskPool";
import { AssetList } from "./list/AssetList";
import { LoadAssetTask } from "./task/LoadAssetTask";
import { LoadListTask } from "./task/LoadListTask";
import { LoadTask } from "./task/LoadTask";
import { IAsset } from "./type/IAsset";

/** Assets **
* ...
* @author Sith
* @created 2020-08-17
*/

export class Assets {

	public static readonly DEFAULT_LIST: AssetList = new AssetList('Default');

	private static readonly _map: Map<string, AssetList> = new Map<string, AssetList>();
	private static readonly _taskPool: TaskPool = new TaskPool(true);

	//-------------------------------------------------- PUBLIC --------------------------------------------------


	/** Initialize */
	public static init(concurrency: number = 10, preloader?: any): void {
		this.addLists(this.DEFAULT_LIST);
		Loader.shared.concurrency = concurrency;

		//todo: apply params...
		console.log('Assets system initialized.');
	}


	/** Add an AssetList(s) */
	public static addLists(...lists: AssetList[]): void {
		lists.forEach(list => {
			if (this._map.has(list.id))
				throw new Error(this.name + ': AssetList ' + list.id + ' already exist!');
			this._map.set(list.id, list);
		});
	}


	/** Add an Asset(s) to selected AssetList */
	public static addAssets(listID: string, ...assets: IAsset[]): void {
		const list: AssetList = this.getList(listID);
		if (!list)
			throw new Error(this.name + ': AssetList ' + listID + ' undefined!');
		assets.forEach(asset => {
			list.add(asset);
		});
	}


	/** Get an AssetList */
	public static getList(listID: string): AssetList {
		const list: AssetList = this._map.get(listID);
		if (!list)
			throw new Error('AssetList "' + listID + '" not found!');
		return list;
	}


	/** Get an IAsset */
	public static getAsset(assetID: string, listID?: string): IAsset {
		if (!listID)
			return this.DEFAULT_LIST.get(assetID);
		return this.getList(listID).get(assetID);
	}


	/** Clear all/selected AssetList(s) / Asset(s)
	 * 
	 * Assets.clear();
	 * Assets.clear({ listID: 'MyListA' }, { listID: 'MyListB' });
	 * Assets.clear({ listID: 'MyList', assetsID: ['FileA', 'FileB'] });
	*/
	public static clear(...lists: { listID: string, assetsID?: Array<string> }[]): void {
		if (!lists.length) {
			this._map.forEach(list => {
				list.clear();
			});
		}
		let list: AssetList;
		lists.forEach(olist => {
			list = this._map.get(olist.listID);
			if (!list)
				throw new Error(this.name + ': AssetList ' + olist.listID + ' undefined!');
			if (!olist.assetsID) {
				list.clear();
			} else {
				olist.assetsID.forEach(assetID => {
					list.get(assetID).clear();
				});
			}
		});
	}


	/** Load all/selected AssetList(s) / Asset(s), returns last task from queue 
	 * 
	 * Assets.load();
	 * Assets.load({ listID: 'MyListA' }, { listID: 'MyListB' });
	 * Assets.load({ listID: 'MyList', assetsID: ['FileA', 'FileB'] });
	*/
	public static load(...lists: { listID: string, assetsID?: Array<string> }[]): ITask {
		let task: ITask;
		if (!lists.length) {
			task = new LoadTask('LoadTask', this._map);
			setTimeout(this._taskPool.add.bind(this._taskPool), 0, task); // fix for .onStart()
			return task;
		}
		lists.forEach(olist => {
			if (!olist.assetsID) {
				task = new LoadListTask('LoadList ' + olist.listID, this._map, olist.listID);
				setTimeout(this._taskPool.add.bind(this._taskPool), 0, task);
			} else {
				olist.assetsID.forEach(assetID => {
					task = new LoadAssetTask('LoadAsset ' + assetID + ' from ' + olist.listID, this._map, olist.listID, assetID);
					setTimeout(this._taskPool.add.bind(this._taskPool), 0, task);
				});
			}
		});
		return task;
	}


	/** Removes all/selected AssetList(s) / Asset(s), not cleans them */
	public static remove(...lists: { listID: string, assetsID?: Array<string> }[]): void {
		if (!lists.length) {
			this._map.forEach(list => {
				this._map.delete(list.id);
			});
		}
		let list: AssetList;
		lists.forEach(olist => {
			list = this._map.get(olist.listID);
			if (!list)
				throw new Error(this.name + ': AssetList ' + olist.listID + ' undefined!');
			if (!olist.assetsID) {
				this._map.delete(olist.listID);
			} else {
				olist.assetsID.forEach(assetID => {
					list.map.delete(assetID);
				});
			}
		});
	}


	/** Get the Map of all AssetLists inside */
	public static get map(): Map<string, AssetList> {
		return this._map;
	}


	// SHORTCUTS

	/** Shortcut for TextureAsset data */
	public static texture(assetID: string, listID?: string): Texture {
		return this.getAsset(assetID, listID).data;
	}

	/** Shortcut for SpriteSheetAsset data */
	public static spritesheet(assetID: string, listID?: string): Spritesheet {
		return this.getAsset(assetID, listID).data;
	}

	/** Shortcut for SoundAsset data */
	public static sound(assetID: string, listID?: string): Sound {
		return this.getAsset(assetID, listID).data;
	}

	/** Shortcut for Asset data as JSON parsed object */
	public static json(assetID: string, listID?: string): object {
		return JSON.parse(this.getAsset(assetID, listID).data);
	}

	/** Shortcut for Asset data as text */
	public static text(assetID: string, listID?: string): string {
		return this.getAsset(assetID, listID).data;
	}

	/** Shortcut for Asset data as JSZip object */
	public static zip(assetID: string, listID?: string): JSZip {
		return this.getAsset(assetID, listID).data;
	}

}