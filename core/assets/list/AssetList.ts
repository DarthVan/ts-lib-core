/* Generated with TypeScript snippets */

import { IAsset } from '../type/IAsset';

/** AssetList **
* ...
* @author Sith
* @created 2020-08-17
*/

export class AssetList {

	public readonly id: string;
	public readonly map: Map<string, IAsset>;

	constructor(id: string) {
		this.id = id;
		this.map = new Map<string, IAsset>();
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public clear(): void {
		this.map.forEach(asset => {
			asset.clear();
		});
	}

	public add(asset: IAsset): void {
		if (this.map.has(asset.id))
			throw new Error('AssetList "' + this.id + '" already contains asset "' + asset.id + '" !');
		this.map.set(asset.id, asset);
	}

	public get(id: string): IAsset {
		const asset: IAsset = this.map.get(id);
		if (!asset)
			throw new Error('Asset "' + id + '" not found in "' + this.id + '" !');
		return asset;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}