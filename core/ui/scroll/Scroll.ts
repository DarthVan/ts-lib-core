/* Generated with TypeScript snippets */

import { Easing, Tweener } from "pixi-tweener";
import { Container, DisplayObject, Graphics, InteractionEvent, Rectangle, Ticker } from "pixi.js";
import { IUiInput } from "../IUiInput";
import { UiComponent } from "../UiComponent";
import { ScrollBar } from "./ScrollBar";

/** Scroll **
* ...
* @Author Sith
* @Created 2021-06-08
*/

export class Scroll extends UiComponent<IUiInput> {

	private _rectangle: Rectangle;
	private _container: Container;
	private _containerMask: Graphics;
	private _border: Graphics;
	private _scrollBarV: ScrollBar;
	private _scrollBarH: ScrollBar;
	private _overfilledX: number;
	private _overfilledY: number;

	private _bind: any;

	constructor(input: IUiInput) {
		super(input);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override destroy(): void {
		super.destroy();

		this._rectangle = null;

		this._container.destroy({ children: true });
		this._container = null;

		this._containerMask.destroy();
		this._containerMask = null;

		this._border.destroy();
		this._border = null;

		this._scrollBarV.destroy();
		this._scrollBarV = null;

		this._scrollBarH.destroy();
		this._scrollBarH = null;
	}

	/* public add(displayObject: DisplayObject, x: number, y: number): DisplayObject {

		return displayObject;
	}

	public remove(displayObject: DisplayObject): DisplayObject {

		return displayObject;
	} */

	public verticalOnly(): void {

	}

	public horizontalOnly(): void {

	}

	public scrollToX(value: number): void {

	}

	public scrollToY(value: number): void {

	}

	public get container(): Container {
		return this._container;
	}

	public update(): void {
		this._container.getBounds(true);

		if (this._container.width > this._rectangle.width)
			this._overfilledX = this._container.width - this._rectangle.width;

		if (this._container.height > this._rectangle.height) {
			this._overfilledY = this._container.height - this._rectangle.height;

		}

	}

	public get border(): boolean {
		return this._border.visible;
	}

	public set border(value: boolean) {
		this._border.visible = value;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._rectangle = new Rectangle(0, 0, this._input.width - 10, this._input.height - 10);

		this._container = new Container();
		this._container.interactive = true;
		this.addChild(this._container);

		this._containerMask = new Graphics();
		this._containerMask.beginFill(0xFF0000);
		this._containerMask.drawRect(0, 0, this._input.width - 10, this._input.height - 10);
		this._containerMask.endFill();
		this.addChild(this._containerMask);

		this._border = new Graphics();
		this._border.lineStyle({ width: 1, color: this._input.color });
		this._border.drawRect(0, 0, this._input.width, this._input.height);
		this._border.interactive = this._border.visible = false;
		this.addChild(this._border);

		this._container.mask = this._containerMask;

		this._container.on("childAdded", this.onSomethingAdded.bind(this))
			.on("childRemoved", this.onSomethingRemoved.bind(this))
			.on('mouseover', this.onMouseOver.bind(this))
			.on('mouseout', this.onMouseOut.bind(this));
	}



	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private onSomethingAdded(e: InteractionEvent): void {
		//console.log(e, typeof e, 'added!');

		this.update();
	}

	private onSomethingRemoved(e: InteractionEvent): void {
		//console.log('removed!');

		this.update();
	}

	private onMouseOver(event: InteractionEvent): void {
		window.addEventListener('wheel', this._bind = this.onMouseWheel.bind(this));
		//console.log('wheel event enabled.');
	}

	private onMouseOut(event: InteractionEvent): void {
		window.removeEventListener('wheel', this._bind);
		//console.log('wheel event disabled.');
	}

	private onMouseWheel(event: WheelEvent): void {
		//console.log('on wheel:', e.deltaX, e.deltaY);
		this._container.y -= event.deltaY * 2;

		/* Tweener.init(Ticker.shared);
		Tweener.add({ target: this._container, duration: 0.25, ease: Easing.easeInOutSine },
			{ y: this._container.y - e.deltaY * 2, alpha: 1.0 })
			.finally(this.tweenEnd.bind(this)); */
	}

	/* private tweenEnd(): void {
		console.log('tween end');
	} */

}