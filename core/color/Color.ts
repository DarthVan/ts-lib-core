/* Generated with TypeScript snippets */

import { DisplayObject } from "pixi.js";
import { ColorMatrixFilter } from "pixi.js/node_modules/@pixi/filter-color-matrix";

/** Color **
* ...
* @author Sith
* @created 2020-08-24
*/

export class Color {

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public static addColorFilterTo(displayObject: DisplayObject, tint: number, brightness: number = 1): void {
		const filter: ColorMatrixFilter = new ColorMatrixFilter();

		const r: number = tint >> 16 & 0xFF;
		const g: number = tint >> 8 & 0xFF;
		const b: number = tint & 0xFF;

		filter.matrix[0] = r / 255;
		filter.matrix[6] = g / 255;
		filter.matrix[12] = b / 255;

		filter.brightness(brightness, true);

		displayObject.filters = [filter];
	}

	/** Adds darkness or lightness to selected color -1...1 */
	public static mix(color: number, lightness: number = 0): number {
		if (lightness == 0)
			return color;

		if (lightness > 1)
			lightness = 1;
		else if (lightness < -1)
			lightness = -1;

		let r: number = color >> 16;
		let g: number = color >> 8 & 0xFF;
		let b: number = color & 0xFF;
		//let a = value >> 24 & 0xFF;

		if (lightness > 0) {
			r += 0xFF * lightness;
			g += 0xFF * lightness;
			b += 0xFF * lightness;
			r = r > 0xFF ? 0xFF : r;
			g = g > 0xFF ? 0xFF : g;
			b = b > 0xFF ? 0xFF : b;
		} else {
			r *= (1 + lightness);
			g *= (1 + lightness);
			b *= (1 + lightness);
		}

		return r << 16 | g << 8 | b;
	}

	public static colorToString(value: number, alpha: number = 1.0): string {
		let str: string = '#' + ("000000" + value.toString(16)).substr(-6).toUpperCase();
		if (alpha < 1.0)
			str += Math.floor(alpha * 255).toString(16).toUpperCase();
		return str;
	}

	public static rgbaToString(value: number): string {
		return '#' + (value + 0x100000000).toString(16).substr(-8).toUpperCase();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}