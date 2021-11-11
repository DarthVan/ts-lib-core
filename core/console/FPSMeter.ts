/* Generated with TypeScript snippets */

import { Graphics, Ticker } from "pixi.js";
import { Color } from "../color/Color";
import { IUiInput } from "../ui/IUiInput";
import { ConsoleModule } from "./ConsoleModule";

/** FPSMeter **
* ...
* @Author Sith
* @Created 2021-05-08
*/

export class FPSMeter extends ConsoleModule {

	private _data: Array<number>;

	private _graphics: Graphics;
	private _grid: Graphics;
	private _intervalID: number;

	private readonly _updateTime: number = 16.66;
	private readonly _valuesNum: number = 120;

	constructor(input: IUiInput) {
		super("FPS Meter", input);
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public override destroy(): void {
		super.destroy();

		this._grid.destroy();
		this._grid = null;

		this._graphics.destroy();
		this._graphics = null;

		this._data = null;

		clearInterval(this._intervalID);
	}

	public override maximize(): void {
		super.maximize();

		this._grid.visible = true;
		this._graphics.visible = true;
	}

	public override minimize(): void {
		super.minimize();

		this._grid.visible = false;
		this._graphics.visible = false;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._data = new Array<number>();

		let dy: number = 18;
		this._grid = new Graphics();
		this._grid.lineStyle({ color: this._input.color, alpha: 0.75, width: 1 });
		for (let i: number = 0; i <= 6; i++) {
			this._grid.moveTo(0, i * dy);
			this._grid.lineTo(this._input.width - 20, i * dy);
		}
		this._grid.moveTo(0, 0);
		this._grid.lineTo(0, 108);
		this._grid.moveTo(this._input.width - 20, 0);
		this._grid.lineTo(this._input.width - 20, 108);
		this._grid.x = 10;
		this._grid.y = 30;
		this.addChild(this._grid);

		this._graphics = new Graphics();
		this._graphics.x = 10;
		this._graphics.y = 30;
		this.addChild(this._graphics);

		this._intervalID = setInterval(this.onInterval.bind(this), this._updateTime);
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private onInterval(): void {
		let value: number = Math.round(Ticker.shared.FPS);
		this._title.text = 'FPS Meter: ' + value;

		this._data.push(value);
		if (this._data.length > this._valuesNum)
			this._data.shift();

		if (this._data.length < 2)
			return;

		let fullGWidth: number = this._input.width - 20;
		let dx: number = fullGWidth / this._valuesNum;
		let cx: number = fullGWidth;
		let i: number = this._data.length - 1;

		this._graphics.clear();
		this._graphics.beginFill(Color.mix(this._input.color, 0.25), 0.25);
		this._graphics.moveTo(cx, -this._data[i] * 1.8 + 108);
		while (i >= 0)
			this._graphics.lineTo(cx -= dx, -this._data[i--] * 1.8 + 108);
		this._graphics.lineTo(cx, -this._data[0] * 1.8 + 108);
		this._graphics.lineTo(cx, 108);
		this._graphics.lineTo(fullGWidth, 108);
		this._graphics.lineTo(fullGWidth, -this._data[this._data.length - 1] * 1.8 + 108);
		this._graphics.endFill();
	}


	/* fpsMeter() {
		let prevTime = Date.now(),
			frames = 0;

		requestAnimationFrame(function loop() {
			const time = Date.now();
			frames++;
			if (time > prevTime + 1000) {
				let fps = Math.round((frames * 1000) / (time - prevTime));
				prevTime = time;
				frames = 0;

				console.info('FPS: ', fps);
			}

			requestAnimationFrame(loop);
		});
	} */

}