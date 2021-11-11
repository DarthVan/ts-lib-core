/* Generated with TypeScript snippets */

import { Sound } from "@pixi/sound";
import { DisplayObject, InteractionEvent } from "pixi.js";
import { BasicLabel } from "../label/BasicLabel";
import { UiComponent } from "../UiComponent";
import { IButtonInput } from "./IButtonInput";

/** BasicButton **
* ...
* @Author Sith
* @Created 2021-06-10
*/

export class BasicButton extends UiComponent<IButtonInput> {

	protected _normal: DisplayObject;
	protected _over: DisplayObject;
	protected _down: DisplayObject;

	protected _label: BasicLabel;
	protected _icon: DisplayObject;

	protected _soundOver: Sound;
	protected _soundDown: Sound;

	private _isOver: boolean;

	constructor(input: IButtonInput) {
		super(input);
		if (input.text)
			this.text = input.text;
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override destroy(): void {
		this.off('mouseover', this.onOver)
			.off('mouseout', this.onOut)
			.off('mousedown', this.onPress)
			.off('touchstart', this.onPress)
			.off('mouseup', this.onRelease)
			.off('mouseupoutside', this.onRelease)
			.off('touchend', this.onRelease)
			.off('touchendoutside', this.onRelease);

		if (this._normal)
			this._normal.destroy();
		this._normal = null;

		if (this._over)
			this._over.destroy();
		this._over = null;

		if (this._down)
			this._down.destroy();
		this._down = null;

		if (this._label)
			this._label.destroy();
		this._label = null;

		if (this._icon)
			this._icon.destroy();
		this._icon = null;
	}

	public get label(): BasicLabel {
		return this._label;
	}

	public get text(): string {
		return this._label?.text;
	}

	public set text(value: string) {
		const fontSize: number = Math.floor(this._input.height / 2);

		if (!this._label) {
			this._label = new BasicLabel({ color: 0xFFFFFF, width: this._input.width - 10 });
			this._label.style.fontSize = fontSize;
			this._label.style.dropShadow = true;
			this._label.style.dropShadowAlpha = 1;
			this._label.style.dropShadowAngle = 90;
			this._label.style.dropShadowBlur = 3;
			this._label.style.dropShadowColor = 0x000000;
			this._label.style.dropShadowDistance = 4;
			this.addChildAt(this._label, this.children.length); // test it !!!!11
		}

		this._label.text = value;
		this._label.x = (this._input.width - this._label.width) / 2;
		this._label.y = (this._input.height - fontSize) / 2;
	}

	public get icon(): DisplayObject {
		return this._icon;
	}

	public set icon(value: DisplayObject) {
		if (this._icon)
			this._icon.destroy();
		this._icon = value;
		this.addChildAt(this._icon, this.children.length); // test it !!!!11
	}

	public get normal(): DisplayObject {
		return this._normal;
	}

	public set normal(value: DisplayObject) {
		if (this._normal)
			this._normal.destroy();
		this._normal = value;
		this.addChild(this._normal);
	}

	public get over(): DisplayObject {
		return this._over;
	}

	public set over(value: DisplayObject) {
		if (this._over)
			this._over.destroy();
		this._over = value;
		this.addChild(this._over);
		this._over.visible = false;
	}

	public get down(): DisplayObject {
		return this._down;
	}

	public set down(value: DisplayObject) {
		if (this._down)
			this._down.destroy();
		this._down = value;
		this.addChild(this._down);
		this._down.visible = false;
	}

	public get soundOver(): Sound {
		return this._soundOver;
	}

	public set soundOver(value: Sound) {
		if (this._soundOver)
			this._soundOver.destroy(); // ??? test it
		this._soundOver = value;
	}

	public get soundDown(): Sound {
		return this._soundDown;
	}

	public set soundDown(value: Sound) {
		if (this._soundDown)
			this._soundDown.destroy(); // ??? test it
		this._soundDown = value;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override defaults(): void {

	}

	protected override init(): void {
		super.init();

		this.buttonMode = true;

		// add listeners
		this.on('mouseover', this.onOver)
			.on('mouseout', this.onOut)
			.on('mousedown', this.onPress)
			.on('touchstart', this.onPress)
			.on('mouseup', this.onRelease)
			.on('mouseupoutside', this.onRelease)
			.on('touchend', this.onRelease)
			.on('touchendoutside', this.onRelease);

		this.activate();
	}

	protected onPress(event: InteractionEvent): void {
		event.stopPropagation();

		if (this._down) {
			this._normal.visible = false;
			this._down.visible = true;
		}

		if (this._over)
			this._over.visible = false;

		if (this._soundDown)
			this._soundDown.play();
	}

	protected onRelease(event: InteractionEvent): void {
		event.stopPropagation();

		if (this._isOver) {
			if (this._over)
				this._over.visible = true;
		} else
			this._normal.visible = true;

		if (this._down)
			this._down.visible = false;
	}

	protected onOver(event: InteractionEvent): void {
		event.stopPropagation();

		if (this._over) {
			this._normal.visible = false;
			this._over.visible = true;
		}

		this._isOver = true;

		if (this._soundOver)
			this._soundOver.play();
	}

	protected onOut(event: InteractionEvent): void {
		event.stopPropagation();

		this._normal.visible = true;

		if (this._over)
			this._over.visible = false;

		this._isOver = false;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}