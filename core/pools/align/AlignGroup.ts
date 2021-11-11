/* Generated with TypeScript snippets */

import { DisplayObject, Point, Rectangle } from "pixi.js";
import { AlignType } from "./AlignType";
import { IAlignGroup } from "./IAlignGroup";

/** AlignGroup **
* ...
* @Author Sith
* @Created 2021-01-28
*/

export class AlignGroup implements IAlignGroup {

	public readonly id: string;

	protected _views: Array<DisplayObject>;
	protected _rect: Rectangle;
	protected _options: Options;
	protected _backup: Array<Point>;
	protected _sf: number;

	private readonly _updatesX: Map<AlignType, () => void>;
	private readonly _updatesY: Map<AlignType, () => void>;

	constructor(id: string, views: Array<DisplayObject>, rect: Rectangle, options?: Options) {
		this.id = id;

		this._views = views;
		this._rect = rect;

		if (!options) options = { align: AlignType.CENTER, offsetX: 0, offsetY: 0, padX: 0, padY: 0, shiftX: 0, shiftY: 0 };
		if (!options.align) options.align = AlignType.CENTER;
		if (!options.offsetX) options.offsetX = 0;
		if (!options.offsetY) options.offsetY = 0;
		if (!options.padX) options.padX = 0;
		if (!options.padY) options.padY = 0;
		if (!options.shiftX) options.shiftX = 0;
		if (!options.shiftY) options.shiftY = 0;

		this._options = options;

		// for restore original positions
		this._backup = new Array<Point>();
		this._views.forEach(view => {
			this._backup.push(new Point(view.x, view.y));
		});

		this._updatesX = new Map<AlignType, () => void>([
			[AlignType.TOP_LEFT, this.updateByLeftX.bind(this)],
			[AlignType.CENTER_LEFT, this.updateByLeftX.bind(this)],
			[AlignType.BOTTOM_LEFT, this.updateByLeftX.bind(this)],
			[AlignType.TOP_CENTER, this.updateByCenterX.bind(this)],
			[AlignType.CENTER, this.updateByCenterX.bind(this)],
			[AlignType.BOTTOM_CENTER, this.updateByCenterX.bind(this)],
			[AlignType.TOP_RIGHT, this.updateByRightX.bind(this)],
			[AlignType.CENTER_RIGHT, this.updateByRightX.bind(this)],
			[AlignType.BOTTOM_RIGHT, this.updateByRightX.bind(this)]
		]);

		this._updatesY = new Map<AlignType, () => void>([
			[AlignType.TOP_CENTER, this.updateByTopY.bind(this)],
			[AlignType.TOP_LEFT, this.updateByTopY.bind(this)],
			[AlignType.TOP_RIGHT, this.updateByTopY.bind(this)],
			[AlignType.CENTER, this.updateByCenterY.bind(this)],
			[AlignType.CENTER_LEFT, this.updateByCenterY.bind(this)],
			[AlignType.CENTER_RIGHT, this.updateByCenterY.bind(this)],
			[AlignType.BOTTOM_CENTER, this.updateByBottomY.bind(this)],
			[AlignType.BOTTOM_LEFT, this.updateByBottomY.bind(this)],
			[AlignType.BOTTOM_RIGHT, this.updateByBottomY.bind(this)]
		]);
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public destroy(): void {
		for (let i: number = 0; i < this._backup.length; i++) {
			this._views[i].x = this._backup[i].x;
			this._views[i].y = this._backup[i].y;
		}
		this._views = null;
		this._rect = null;
		this._backup = null;
		this._options = null;
	}

	public updateX(): void {
		//this._sf = App.current.settings.scale.factor;
		this._updatesX.get(this._options.align)();
	}

	public updateY(): void {
		//this._sf = App.current.settings.scale.factor;
		this._updatesY.get(this._options.align)();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected updateByLeftX(): void {

	}

	protected updateByCenterX(): void {

	}

	protected updateByRightX(): void {

	}

	protected updateByTopY(): void {

	}

	protected updateByCenterY(): void {

	}

	protected updateByBottomY(): void {

	}

	protected alignX(curX: number): void {

	}

	protected alignY(curY: number): void {

	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}

type Options = {
	align?: AlignType,
	offsetX?: number,
	offsetY?: number,
	padX?: number,
	padY?: number,
	shiftX?: number,
	shiftY?: number
};