/* Generated with TypeScript snippets */

import { LoaderResource } from "pixi.js";
import { IAsset } from './IAsset';

/** Asset **
* ...
* @author Sith
* @created 2020-09-16
*/

export class Asset implements IAsset {

	public readonly id: string;
	protected _source: any;
	protected _data: any;

	constructor(id: string, url?: string) {
		this.id = id;
		this._source = url ? { url: url } : null;

		this.init();
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public clear(): void {
		this._data = null;
	}

	public get source(): { url: string, xhr: any } {
		return this._source;
	}

	public get data(): any {
		return this._data;
	}

	public set data(value: any) {
		this._data = value;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	protected init(): void {
		if (this._source)
			this._source.xhr = LoaderResource.XHR_RESPONSE_TYPE.DEFAULT; // override in external if needed
	}

}