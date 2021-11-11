/* Generated with TypeScript snippets */

import { AlignGroup } from "./AlignGroup";

/** LinearAlignGroup **
* ...
* @Author Sith
* @Created 2021-01-28
*/

export class LinearAlignGroup extends AlignGroup {

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override updateByLeftX(): void {
		this.alignX(this._rect.x + this._options.offsetX);
	}

	protected override updateByCenterX(): void {
		var fullWidth: number = this._views[0]._bounds.getRectangle().width;
		for (let i: number = 1; i < this._views.length; i++)
			fullWidth += (this._options.padX > 0 ? this._views[i]._bounds.getRectangle().width + this._options.padX : 0) + this._options.shiftX;
		this.alignX((this._rect.width - fullWidth) / 2 + this._rect.x + this._options.offsetX);
	}

	protected override updateByRightX(): void {
		var fullWidth: number = this._views[0]._bounds.getRectangle().width;
		for (let i: number = 1; i < this._views.length; i++)
			fullWidth += (this._options.padX > 0 ? this._views[i]._bounds.getRectangle().width + this._options.padX : 0) + this._options.shiftX;
		this.alignX(this._rect.width - fullWidth + this._rect.x + this._options.offsetX);
	}

	protected override updateByTopY(): void {
		this.alignY(this._rect.y + this._options.offsetY);
	}

	protected override updateByCenterY(): void {
		var fullHeight: number = this._views[0]._bounds.getRectangle().height;
		for (let i: number = 1; i < this._views.length; i++)
			fullHeight += (this._options.padY > 0 ? this._views[i]._bounds.getRectangle().height + this._options.padY : 0) + this._options.shiftY;
		this.alignY((this._rect.height - fullHeight) / 2 + this._rect.y + this._options.offsetY);
	}

	protected override updateByBottomY(): void {
		var fullHeight: number = this._views[0]._bounds.getRectangle().height;
		for (let i: number = 1; i < this._views.length; i++)
			fullHeight += (this._options.padY > 0 ? this._views[i]._bounds.getRectangle().height + this._options.padY : 0) + this._options.shiftY;
		this.alignY(this._rect.y + this._rect.height - fullHeight - this._options.offsetY);
	}

	// TODO: align different objects by THEIR sides or center
	protected override alignX(curX: number, centered: boolean = false): void {
		//curX /= this._sf;
		this._views[0].x = curX;
		for (let i: number = 1; i < this._views.length; i++)
			curX = this._views[i].x = curX + (this._options.padX > 0 ? this._views[i - 1]._bounds.getRectangle().width + this._options.padX : 0) + this._options.shiftX;
	}

	protected override alignY(curY: number): void {
		//curY /= this._sf;
		this._views[0].y = curY;
		for (let i: number = 1; i < this._views.length; i++)
			curY = this._views[i].y = curY + (this._options.padY > 0 ? this._views[i - 1]._bounds.getRectangle().height + this._options.padY : 0) + this._options.shiftY;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}