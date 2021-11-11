/* Generated with TypeScript snippets */

import { GlowFilter } from "pixi-filters/node_modules/@pixi/filter-glow";
import { SCALE_MODES, Sprite, Texture, Ticker, TilingSprite } from "pixi.js";
import { Color } from "../../color/Color";
import { BasicLabel } from "../label/BasicLabel";
import { BasicProgressBar } from "./BasicProgressBar";

/** CodeProgressBar **
* ...
* @Author Sith
* @Created 2021-04-02
*/

export class CodeProgressBar extends BasicProgressBar {

	private _barLight: Sprite;
	private _lightDelay: number;

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		super.destroy();

		this.deactivate();
		this._barLight.destroy({ texture: true, baseTexture: true });
	}

	public override show(): void {
		super.show();

		this.activate();
	}

	public override hide(): void {
		super.hide();

		this.deactivate();
	}

	public override showProgress(data: { progress?: number, info?: string }): void {
		super.showProgress(data);

		/* if (data.info)
			this._info.text = data.info; */
	}

	public override showError(message?: string): void {
		this._info.style.fill = [0xFF0000, 0xFFFFFF];
		this._info.text = message;
		this._info.filters = [new GlowFilter({ distance: 20, color: 0xFF0000, quality: 0.25, outerStrength: 1 }) as any];
	}

	public override activate(): void {
		super.activate();

		Ticker.shared.add(this.onTicker, this);
	}

	public override deactivate(): void {
		super.deactivate();

		Ticker.shared.remove(this.onTicker, this);
		Ticker.shared.remove(this.onLightTicker, this);
	}

	public override reset(): void {
		super.reset();

		this._barLight.x = 5 - this._input.width * 2;
		this._lightDelay = 9;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		let canvas: HTMLCanvasElement;
		let context: CanvasRenderingContext2D;
		let gradient: CanvasGradient;

		// 1. draw bg:
		canvas = document.createElement('canvas');
		canvas.width = this._input.width;
		canvas.height = this._input.height;
		context = canvas.getContext('2d');
		context.fillStyle = Color.colorToString(this._input.color);
		context.fillRect(0, 0, this._input.width, this._input.height);

		gradient = context.createLinearGradient(0, 0, 0, this._input.height);
		gradient.addColorStop(0.0, "#FFFFFF7F");
		gradient.addColorStop(0.49, "#00000080");
		gradient.addColorStop(0.5, "#000000CC");
		gradient.addColorStop(1.0, "#0000007F");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(this._input.width, 0);
		context.lineTo(this._input.width, this._input.height);
		context.lineTo(this._input.width - 3, this._input.height - 3);
		context.lineTo(this._input.width - 3, 3);
		context.lineTo(3, 3);
		context.lineTo(0, 0);
		context.closePath();
		context.fill();

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(0, this._input.height);
		context.lineTo(this._input.width, this._input.height);
		context.lineTo(this._input.width - 3, this._input.height - 3);
		context.lineTo(3, this._input.height - 3);
		context.lineTo(3, 3);
		context.lineTo(0, 0);
		context.closePath();
		context.fill();

		gradient = context.createLinearGradient(0, 0, this._input.width, 0);
		gradient.addColorStop(0.0, "#FFFFFF00");
		gradient.addColorStop(0.5, "#FFFFFFC8");
		gradient.addColorStop(1.0, "#FFFFFF00");
		context.fillStyle = gradient;
		context.fillRect(0, 0, this._input.width, 3);

		gradient = context.createLinearGradient(0, 0, this._input.width, 0);
		gradient.addColorStop(0.0, "#FFFFFF00");
		gradient.addColorStop(0.5, "#FFFFFF7F");
		gradient.addColorStop(1.0, "#FFFFFF00");
		context.fillStyle = gradient;
		context.fillRect(0, this._input.height - 3, this._input.width, 3);

		gradient = context.createLinearGradient(0, 0, 0, this._input.height - 6);
		gradient.addColorStop(0.0, "#000000FF");
		gradient.addColorStop(1.0, "#000000CC");
		context.fillStyle = gradient;
		context.fillRect(3, 3, this._input.width - 6, this._input.height - 6);

		this._background = new Sprite(Texture.from(canvas, { scaleMode: SCALE_MODES.LINEAR }));
		this.addChild(this._background);

		this.getBounds(true); // stops bounds update

		// 2. draw bar

		const w: number = this._input.width / 10;
		const h: number = this._input.height - 10;

		canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		context = canvas.getContext('2d');
		context.fillStyle = Color.colorToString(this._input.color);
		context.fillRect(0, 0, w, h);

		gradient = context.createLinearGradient(0, 0, 0, h);
		gradient.addColorStop(0.0, "#FFFFFFCC");
		gradient.addColorStop(0.49, "#FFFFFF00");
		gradient.addColorStop(0.5, "#0000007F");
		gradient.addColorStop(0.75, "#0000007F");
		gradient.addColorStop(1.0, "#00000033");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(w / 2, 0);
		context.lineTo(0, h);
		context.lineTo(0, 0);
		context.closePath();
		context.fill();

		context.beginPath();
		context.moveTo(w, 0);
		context.lineTo(w, h);
		context.lineTo(w / 2, h);
		context.lineTo(w, 0);
		context.closePath();
		context.fill();

		gradient = context.createLinearGradient(0, 0, 0, h);
		gradient.addColorStop(0.0, "#FFFFFFCC");
		gradient.addColorStop(0.49, "#0000004C");
		gradient.addColorStop(0.5, "#00000099");
		gradient.addColorStop(0.75, "#00000099");
		gradient.addColorStop(1.0, "#0000004C");
		context.fillStyle = gradient;

		context.beginPath();
		context.moveTo(w / 2, 0);
		context.lineTo(w, 0);
		context.lineTo(w / 2, h);
		context.lineTo(0, h);
		context.lineTo(w / 2, 0);
		context.closePath();
		context.fill();

		this._tiledFill = new TilingSprite(Texture.from(canvas, { scaleMode: SCALE_MODES.LINEAR }), this._input.width + w, h);
		this.addChild(this._tiledFill);
		this._tiledFill.x = -this._input.width / 10;
		this._tiledFill.y = 5;


		// 3. draw light effect

		canvas = document.createElement('canvas');
		canvas.width = this._input.width * 2;
		canvas.height = this._input.height - 10;
		context = canvas.getContext('2d');
		gradient = context.createLinearGradient(0, 0, this._input.width * 2, 0);
		gradient.addColorStop(0.0, "#FFFFFF00");
		gradient.addColorStop(0.4, "#FFFFFF44");
		gradient.addColorStop(0.5, "#FFFFFF22");
		gradient.addColorStop(0.9, "#FFFFFF88");
		gradient.addColorStop(1.0, "#FFFFFF00");
		context.fillStyle = gradient;
		context.fillRect(0, 0, this._input.width * 2, this._input.height - 10);

		this._barLight = new Sprite(Texture.from(canvas, { scaleMode: SCALE_MODES.LINEAR }));
		this.addChild(this._barLight);
		this._barLight.x = 5 - this._input.width * 2;
		this._barLight.y = 5;

		const fg: GlowFilter = new GlowFilter({ distance: 30, color: Color.mix(this._input.color, 0.5), quality: 0.05, outerStrength: 1 });
		this._barLight.filters = [fg as any];


		// 4. draw mask

		canvas = document.createElement('canvas');
		canvas.width = this._input.width - 10;
		canvas.height = this._input.height - 10;
		context = canvas.getContext('2d');
		context.fillStyle = '#FF0000';
		context.fillRect(0, 0, this._input.width - 10, this._input.height - 10);

		this._fillMask = new Sprite(Texture.from(canvas, { scaleMode: SCALE_MODES.LINEAR }));
		this.addChild(this._fillMask);
		this._fillMask.x = 5;
		this._fillMask.y = 5;

		this._fillMask.scale.x = 0.0;

		this._tiledFill.mask = this._fillMask;
		this._barLight.mask = this._fillMask;


		// 5. draw info

		this._info = new BasicLabel({ color: this._input.color, width: 800 });
		this.addChild(this._info);
		this._info.x = (
			Math.min(this._input.width, this._info._bounds.getRectangle().width) -
			Math.max(this._input.width, this._info._bounds.getRectangle().width)
		) / 2;
		this._info.y = -25;
		//console.log('info width =', this._info._bounds.getRectangle().width);

		this._info.filters = [new GlowFilter({ distance: 20, color: this._input.color, quality: 0.25, outerStrength: 1 }) as any];
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private onTicker(): void {
		this._tiledFill.x += 1;
		if (this._tiledFill.x >= 0) {
			this._tiledFill.x = -this._input.width / 10;
			this._lightDelay++;
		}

		if (this._lightDelay >= 10) {
			this._lightDelay = 0;
			this._barLight.x = 5 - this._input.width * 2;
			Ticker.shared.add(this.onLightTicker, this);
		}
	}

	private onLightTicker(): void {
		this._barLight.x += 10;

		if (this._barLight.x >= 5 + this._input.width * 2)
			Ticker.shared.remove(this.onLightTicker, this);
	}
}