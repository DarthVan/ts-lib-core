/* Generated with TypeScript snippets */

import { Graphics } from "pixi.js";
import { Color } from "../color/Color";
import { IUiInput } from "../ui/IUiInput";
import { BasicLabel } from "../ui/label/BasicLabel";
import { UiComponent } from "../ui/UiComponent";
import { ConsoleExpandButton } from "./ConsoleExpandButton";

/** ConsoleModule **
* ...
* @Author Sith
* @Created 2021-05-06
*/

export class ConsoleModule extends UiComponent<IUiInput> {

	protected _bg: Graphics;
	protected _title: BasicLabel;
	protected _expandButton: ConsoleExpandButton;

	constructor(title: string, input: IUiInput) {
		super(input);

		this._title.text = title;

		this.minimize();
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		super.destroy();

		this._bg.destroy();
		this._bg = null;

		this._title.destroy();
		this._title = null;

		this._expandButton.destroy();
		this._expandButton = null;
	}

	public override resize(size: { w: number, h: number }): void {
		super.resize(size);
	}

	public maximize(): void {
		this._bg.clear();
		this._bg.lineStyle({ width: 1, alpha: 1, color: this._input.color });
		this._bg.beginFill(Color.mix(this._input.color, -0.9), 0.7);
		this._bg.drawRect(0, 0, this._input.width, this._input.height);
		this._bg.endFill();

		this._expandButton.showAsMaximized();
	}

	public minimize(): void {
		this._bg.clear();
		this._bg.lineStyle({ width: 1, alpha: 1, color: this._input.color });
		this._bg.beginFill(Color.mix(this._input.color, -0.9), 0.7);
		this._bg.drawRect(0, 0, this._input.width, 30);
		this._bg.endFill();

		this._expandButton.showAsMinimized();
	}

	public get title(): BasicLabel {
		return this._title;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		//super.draw();

		this._bg = new Graphics();
		this._bg.lineStyle({ width: 1, alpha: 1, color: this._input.color });
		this._bg.beginFill(Color.mix(this._input.color, -0.9), 0.7);
		this._bg.drawRect(0, 0, this._input.width, this._input.height);
		this._bg.endFill();
		this.addChild(this._bg);
		this.getBounds(true);

		this._title = new BasicLabel({ color: this._input.color });
		this._title.style.align = "left";
		this._title.style.dropShadow = true;
		this._title.style.dropShadowAlpha = 1;
		this._title.style.dropShadowAngle = 90;
		this._title.style.dropShadowBlur = 3;
		this._title.style.dropShadowColor = 0x000000;
		this._title.style.dropShadowDistance = 4;
		this._title.x = 7;
		this._title.y = 5;
		this.addChild(this._title);

		this._expandButton = new ConsoleExpandButton(this._input.color, this.minimize.bind(this), this.maximize.bind(this));
		this._expandButton.x = this._input.width - 18;
		this._expandButton.y = 14;
		this.addChild(this._expandButton);
	}

}