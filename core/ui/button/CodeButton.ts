/* Generated with TypeScript snippets */

import { SCALE_MODES, Sprite, Texture } from "pixi.js";
import { Color } from "../../color/Color";
import { BasicButton } from "./BasicButton";
import { ICodeButtonInput } from "./ICodeButtonInput";

/** CodeButton **
* ...
* @Author Sith
* @Created 2021-06-14
*/

export class CodeButton extends BasicButton {

	private _background: Sprite;

	constructor(input: ICodeButtonInput) {
		super(input);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override destroy(): void {
		this._background.destroy({ texture: true, baseTexture: true });
		this._background = null;

		this._normal.destroy({ texture: true, baseTexture: true });
		this._over.destroy({ texture: true, baseTexture: true });
		this._down.destroy({ texture: true, baseTexture: true });

		super.destroy();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		let canvas: HTMLCanvasElement;
		let context: CanvasRenderingContext2D;
		let gradient: CanvasGradient;

		// 1. background
		canvas = document.createElement('canvas');
		canvas.width = this._input.width;
		canvas.height = this._input.height;
		context = canvas.getContext('2d');

		gradient = context.createLinearGradient(0, 0, 0, this._input.height);
		gradient.addColorStop(0.05, "#FFFFFF");
		gradient.addColorStop(0.25, "#000000");
		gradient.addColorStop(0.5, "#FFFFFF");
		//gradient.addColorStop(0.75, "#FFFFFF");
		gradient.addColorStop(0.95, "#000000");
		context.fillStyle = gradient;
		this.drawRoundRectangle(context, this._input.width, this._input.height, 10, 0, 0, 2);

		gradient = context.createLinearGradient(0, 2, 0, this._input.height - 4);
		gradient.addColorStop(0.05, "#000000");
		//gradient.addColorStop(0.25, "#000000");
		gradient.addColorStop(0.5, "#FFFFFF");
		gradient.addColorStop(0.75, "#000000");
		gradient.addColorStop(0.95, "#FFFFFF");
		context.fillStyle = gradient;
		this.drawRoundRectangle(context, this._input.width - 4, this._input.height - 4, 8, 2, 2, 2);

		context.fillStyle = Color.colorToString(this._input.color, 0.5);
		this.drawRoundRectangle(context, this._input.width - 8, this._input.height - 8, 6, 4, 4);

		this._background = new Sprite(Texture.from(canvas, { scaleMode: SCALE_MODES.LINEAR }));
		this.addChild(this._background);


		// normal
		canvas = document.createElement('canvas');
		canvas.width = this._input.width;
		canvas.height = this._input.height;
		context = canvas.getContext('2d');

		context = this.drawGlassRoundRect(context, this._input.width - 8, this._input.height - 8, 6, 4, 4);

		this._normal = new Sprite(Texture.from(canvas, { scaleMode: SCALE_MODES.LINEAR }));
		this._normal.x = 0;
		this._normal.y = 0;
		this.addChild(this._normal);





		// 2. over
		canvas = document.createElement('canvas');
		canvas.width = this._input.width;
		canvas.height = this._input.height;
		context = canvas.getContext('2d');

		this.drawLightGlassRoundRect(context, this._input.width - 8, this._input.height - 8, 6, 4, 4);

		this._over = new Sprite(Texture.from(canvas, { scaleMode: SCALE_MODES.LINEAR }));
		this._over.x = 0;
		this._over.y = 0;
		this.addChild(this._over);
		this._over.visible = false;



		// 3. down
		canvas = document.createElement('canvas');
		canvas.width = this._input.width;
		canvas.height = this._input.height;
		context = canvas.getContext('2d');

		this.drawDarkGlassRoundRect(context, this._input.width - 8, this._input.height - 8, 6, 4, 4);

		this._down = new Sprite(Texture.from(canvas, { scaleMode: SCALE_MODES.LINEAR }));
		this._down.x = 0;
		this._down.y = 0;
		this.addChild(this._down);
		this._down.visible = false;



		canvas = null;
		context = null;
		gradient = null;

	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private drawRoundRectangle(context: CanvasRenderingContext2D, width: number, height: number, radius: number, x?: number, y?: number, asBorder?: number): CanvasRenderingContext2D {
		context.beginPath();
		context.moveTo(x, y + radius);
		context.arcTo(x, y, x + radius, y, radius);
		context.lineTo(x + width - radius, y);
		context.arcTo(x + width, y, x + width, y + radius, radius);
		context.lineTo(x + width, y + height - radius);
		context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
		context.lineTo(x + radius, y + height);
		context.arcTo(x, y + height, x, y + height - radius, radius);
		context.lineTo(x, y + radius);

		if (asBorder) {
			if (asBorder >= radius)
				asBorder = radius - 1;
			context.lineTo(x + asBorder, y + radius);
			context.lineTo(x + asBorder, y + height - radius - asBorder);
			context.arcTo(x + asBorder, y + height - asBorder, x + asBorder + radius, y + height - asBorder, radius - asBorder);
			context.lineTo(x + width - radius - asBorder, y + height - asBorder);
			context.arcTo(x + width - asBorder, y + height - asBorder, x + width - asBorder, y + height - radius - asBorder, radius - asBorder);
			context.lineTo(x + width - asBorder, y + radius + asBorder);
			context.arcTo(x + width - asBorder, y + asBorder, x + width - radius - asBorder, y + asBorder, radius - asBorder);
			context.lineTo(x + radius + asBorder, y + asBorder);
			context.arcTo(x + asBorder, y + asBorder, x + asBorder, y + radius + asBorder, radius - asBorder);
			context.lineTo(x, y + radius);
		}

		context.closePath();
		context.fill();

		return context;
	}

	private drawGlassRoundRect(context: CanvasRenderingContext2D, width: number, height: number, radius: number, x?: number, y?: number): CanvasRenderingContext2D {

		const k1: number = 0.3;
		const k2: number = 0.7;
		const arc: number = (width >> 1) * ((width >> 1) / (height * (k2 - k1)));
		/* if (arc < width / 2)
			arc = width / 2; */

		let gradient: CanvasGradient = context.createLinearGradient(0, y, 0, height + y);
		gradient.addColorStop(0.0, "#FFFFFFCC");
		gradient.addColorStop((k1 + k2) / 2, "#0000004C");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(x, y + height * k1);
		context.lineTo(x, y + radius);
		context.arcTo(x, y, x + radius, y, radius);
		context.lineTo(x + width - radius, y);
		context.arcTo(x + width, y, x + width, y + radius, radius);
		context.lineTo(x + width, y + height * k1);
		context.arcTo(x + width / 2, y + height * k2, x, y + height * k1, arc);
		context.arcTo
		context.closePath();
		context.fill();

		gradient = context.createLinearGradient(0, y, 0, height + y);
		gradient.addColorStop(k1, "#00000099");
		gradient.addColorStop(0.9, "#0000004C");
		gradient.addColorStop(1.0, "#00000000");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(x, y + height * k1);
		context.lineTo(x, y + height + radius);
		context.arcTo(x, y + height, x + radius, y + height, radius);
		context.lineTo(x + width - radius, y + height);
		context.arcTo(x + width, y + height, x + width, y + height + radius, radius);
		context.lineTo(x + width, y + height * k1);
		context.arcTo(x + width / 2, y + height * k2, x, y + height * k1, arc);
		context.closePath();
		context.fill();

		gradient = context.createLinearGradient(x, 0, width + x, 0);
		gradient.addColorStop(0.0, "#00000090");
		gradient.addColorStop(0.3, "#00000000");
		gradient.addColorStop(0.7, "#00000000");
		gradient.addColorStop(1.0, "#00000090");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(x, y + radius);
		context.arcTo(x, y, x + radius, y, radius);
		context.lineTo(x + width - radius, y);
		context.arcTo(x + width, y, x + width, y + radius, radius);
		context.lineTo(x + width, y + height - radius);
		context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
		context.lineTo(x + radius, y + height);
		context.arcTo(x, y + height, x, y + height - radius, radius);
		context.lineTo(x, y + radius);
		context.closePath();
		context.fill();

		return context;
	}


	private drawLightGlassRoundRect(context: CanvasRenderingContext2D, width: number, height: number, radius: number, x?: number, y?: number): CanvasRenderingContext2D {

		const k1: number = 0.3;
		const k2: number = 0.7;
		const arc: number = (width >> 1) * ((width >> 1) / (height * (k2 - k1)));

		let gradient: CanvasGradient = context.createLinearGradient(0, y, 0, height + y);
		gradient.addColorStop(0.0, "#FFFFFFCC");
		gradient.addColorStop((k1 + k2) / 2, "#0000002C");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(x, y + height * k1);
		context.lineTo(x, y + radius);
		context.arcTo(x, y, x + radius, y, radius);
		context.lineTo(x + width - radius, y);
		context.arcTo(x + width, y, x + width, y + radius, radius);
		context.lineTo(x + width, y + height * k1);
		context.arcTo(x + width / 2, y + height * k2, x, y + height * k1, arc);
		context.closePath();
		context.fill();

		gradient = context.createLinearGradient(0, y, 0, height + y);
		gradient.addColorStop(k1, "#00000066");
		gradient.addColorStop(0.9, "#0000002C");
		gradient.addColorStop(1.0, "#00000000");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(x, y + height * k1);
		context.lineTo(x, y + height + radius);
		context.arcTo(x, y + height, x + radius, y + height, radius);
		context.lineTo(x + width - radius, y + height);
		context.arcTo(x + width, y + height, x + width, y + height + radius, radius);
		context.lineTo(x + width, y + height * k1);
		context.arcTo(x + width / 2, y + height * k2, x, y + height * k1, arc);
		context.closePath();
		context.fill();

		gradient = context.createLinearGradient(x, 0, width + x, 0);
		gradient.addColorStop(0.0, "#00000040");
		gradient.addColorStop(0.3, "#00000000");
		gradient.addColorStop(0.7, "#00000000");
		gradient.addColorStop(1.0, "#00000040");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(x, y + radius);
		context.arcTo(x, y, x + radius, y, radius);
		context.lineTo(x + width - radius, y);
		context.arcTo(x + width, y, x + width, y + radius, radius);
		context.lineTo(x + width, y + height - radius);
		context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
		context.lineTo(x + radius, y + height);
		context.arcTo(x, y + height, x, y + height - radius, radius);
		context.lineTo(x, y + radius);
		context.closePath();
		context.fill();

		return context;
	}


	private drawDarkGlassRoundRect(context: CanvasRenderingContext2D, width: number, height: number, radius: number, x?: number, y?: number): CanvasRenderingContext2D {

		const k1: number = 0.0;
		const k2: number = 0.1;

		let gradient: CanvasGradient = context.createLinearGradient(0, y, 0, height + y);
		gradient.addColorStop(0.0, "#FFFFFFCC");
		gradient.addColorStop(0.1, "#0000006C");
		gradient.addColorStop(0.9, "#0000006C");
		gradient.addColorStop(1.0, "#00000000");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(x, y + radius);
		context.arcTo(x, y, x + radius, y, radius);
		context.lineTo(x + width - radius, y);
		context.arcTo(x + width, y, x + width, y + radius, radius);
		context.lineTo(x + width, y + height - radius);
		context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
		context.lineTo(x + radius, y + height);
		context.arcTo(x, y + height, x, y + height - radius, radius);
		context.lineTo(x, y + radius);
		context.closePath();
		context.fill();

		gradient = context.createLinearGradient(x, 0, width + x, 0);
		gradient.addColorStop(0.0, "#000000AA");
		gradient.addColorStop(0.3, "#00000000");
		gradient.addColorStop(0.7, "#00000000");
		gradient.addColorStop(1.0, "#000000AA");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(x, y + radius);
		context.arcTo(x, y, x + radius, y, radius);
		context.lineTo(x + width - radius, y);
		context.arcTo(x + width, y, x + width, y + radius, radius);
		context.lineTo(x + width, y + height - radius);
		context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
		context.lineTo(x + radius, y + height);
		context.arcTo(x, y + height, x, y + height - radius, radius);
		context.lineTo(x, y + radius);
		context.closePath();
		context.fill();

		return context;
	}

}