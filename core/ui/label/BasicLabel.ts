/* Generated with TypeScript snippets */

import { ITextStyle, Text, TEXT_GRADIENT } from "pixi.js";
import { UiComponent } from "../UiComponent";
import { ILabelInput } from "./ILabelInput";

/** BasicLabel **
* ...
* @Author Sith
* @Created 2021-04-09
*/

export class BasicLabel extends UiComponent<ILabelInput> {

	protected _text: Text;
	protected _style: any;
	protected _line: string;

	constructor(input: ILabelInput) {
		super(input);

		this.interactive = false;
		this.interactiveChildren = false;
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		this._text.destroy({ texture: true, baseTexture: true });
		this._style = null;
	}

	public override resize(size?: { w: number, h: number }): void {
		super.resize(size);
	}

	public override show(): void {
		super.show();
	}

	public override hide(): void {
		super.hide();
	}

	public override activate(): void {
		super.activate();
	}

	public override deactivate(): void {
		super.deactivate();
	}

	public override reset(): void {
		this.text = '';
	}

	public get text(): string {
		return this._text.text.substr(0, this._text.text.length - this._line.length);
	}

	public set text(value: string) {
		this._text.text = value + this._line;
		//this._bounds.getRectangle().width = this._text.width;
		this._bounds.getRectangle().height = this._text.height;
	}

	public get style(): ITextStyle {
		return this._text.style as any;
	}

	public set style(value: ITextStyle) {
		this._style = value;
		this._text.style = this._style;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		this.createDefaultStyle();

		this._text = new Text('', this._style);
		this.addChild(this._text);

		this.addingHiddenLine();
	}

	protected addingHiddenLine(): void {
		while (this._text.getBounds(false).width < this._input.width)
			this._text.text += ' ';
		this._line = '\n' + this._text.text;
		this.getBounds(true);
	}

	protected createDefaultStyle(): void {
		this._style = {
			fontFamily: "Consolas",
			fontStyle: "italic",
			fontSize: 20,
			align: "center",
			fillGradientType: TEXT_GRADIENT.LINEAR_VERTICAL,
			fillGradientStops: [0, 1],
			fill: [this._input.color, 0xFFFFFF]
		};
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}