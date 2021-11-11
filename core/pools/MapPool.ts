/* Generated with TypeScript snippets */

/** MapPool **
* ...
* @Author Sith
* @Created 2021-01-29
*/

export class MapPool<Type> {

	protected _map: Map<string, Type>;

	constructor() {
		this._map = new Map<string, Type>();
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public destroy(): void {
		this._map.forEach(element => {
			element = null;
		});
		this._map = null;
	}

	public add(id: string, object: Type): void {
		if (this._map.has(id))
			throw new Error(<any>this.constructor.name + ': Object ' + id + ' already exist!');
		this._map.set(id, object);
	}

	public remove(id: string): void {
		if (!this._map.has(id))
			throw new Error(<any>this.constructor.name + ': Object ' + id + ' is undefined!');
		this._map.delete(id);
	}

	public get(id: string): Type {
		if (!this._map.has(id))
			throw new Error(<any>this.constructor.name + ': Object ' + id + ' is undefined!');
		return this._map.get(id);
	}

	public get length(): number {
		return this._map.size;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}