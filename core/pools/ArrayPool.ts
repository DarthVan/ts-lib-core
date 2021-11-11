/* Generated with TypeScript snippets */


/** ArrayPool **
* ...
* @Author Sith
* @Created 2020-10-25
*/

export class ArrayPool<Type> {

	protected _array: Array<Type>;

	constructor() {
		this._array = new Array<Type>();
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public destroy(): void {
		this._array.forEach(element => {
			element = null;
		});
		this._array.splice(0, this._array.length);
		this._array = null;
	}

	public add(object: Type): void {
		this._array.push(object);
	}

	public remove(object: Type): void {
		for (let i = 0; i < this._array.length; i++)
			if (this._array[i] == object) {
				this._array.splice(i, 1);
				return;
			}
	}

	public get length(): number {
		return this._array.length;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}