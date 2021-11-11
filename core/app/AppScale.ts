/* Generated with TypeScript snippets */

import { Color } from "../color/Color";
import { App } from "./App";
import { AppSettings } from "./AppSettings";

/** AppScale **
* ...
* @Author Sith
* @Created 2021-01-31
*/

export class AppScale {

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	/** Default top-left coner placement without scaling, border and title */
	public static none(app: App): void {
		let data: ScaleData = this.initScaleData(app);
		data.sameRatios = data.fullScreen = true;
		data.scaleFactor = 1;
		data.rWidth = Math.min(data.nWidth, data.iWidth);
		data.rHeight = Math.min(data.nHeight, data.iHeight);
		app.view.style.left = app.view.style.top = '0px';
		document.getElementById("title").hidden = true;
		this.resize(app, data);
	}

	/** Resize viewport only, scale = 1.0 */
	public static fixed(app: App): void {
		let data: ScaleData = this.initScaleData(app);
		data.sameRatios = true;
		data.scaleFactor = 1;
		this.getViewportFixed(data);
		this.alignAppView(app, data);
		this.resize(app, data);
	}

	/** Float scale method */
	public static float(app: App): void {
		let data: ScaleData = this.initScaleData(app);
		this.getSameRatios(data);
		this.getScaleFactor(data);
		this.getViewportFloat(data);
		this.alignAppView(app, data);
		this.resize(app, data);
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private static initScaleData(app: App): ScaleData {
		return {
			nWidth: AppSettings.resolution.width,
			nHeight: AppSettings.resolution.height,
			adaptivity: AppSettings.scale.adaptivity,
			title: AppSettings.title ? true : false,
			iWidth: window.innerWidth,
			iHeight: window.innerHeight,
			fullScreen: document.fullscreenElement == document.getElementById("app")
		};
	}

	private static getSameRatios(data: ScaleData): void {
		const ratio: number = data.iWidth / data.iHeight; // 1.78
		if (data.adaptivity > 1) {
			const raMax: number = (data.nWidth * data.adaptivity) / data.nHeight;  // 2.13
			const raMin: number = data.nWidth / (data.nHeight * data.adaptivity);  // 1.48
			data.sameRatios = raMin <= ratio && ratio <= raMax;
		} else
			data.sameRatios = data.nWidth / data.nHeight == ratio;
	}

	private static getScaleFactor(data: ScaleData): void {
		data.w = data.iWidth - (data.fullScreen ? data.sameRatios ? 0 : 20 : 40);
		data.h = data.iHeight - (data.fullScreen ? data.sameRatios ? 0 : 20 : data.title ? 70 : 40);
		data.scaleFactor = Math.min(data.w / data.nWidth, data.h / data.nHeight);
	}

	private static getViewportFixed(data: ScaleData): void {
		if (data.fullScreen) {
			data.rWidth = data.iWidth;
			data.rHeight = data.iHeight;
		} else {
			data.rWidth = data.iWidth - 40;
			data.rHeight = data.iHeight - (data.title ? 70 : 40);
		}
		if (data.adaptivity <= 1)
			return;
		data.rWidth = Math.min(data.rWidth, data.nWidth * data.adaptivity);
		data.rHeight = Math.min(data.rHeight, data.nHeight * data.adaptivity);
		if (data.fullScreen && (data.rWidth < data.iWidth || data.rHeight < data.iHeight)) {
			data.rWidth = Math.min(data.rWidth, data.iWidth - 20);
			data.rHeight = Math.min(data.rHeight, data.iHeight - 20);
			data.sameRatios = false;
		}
	}

	private static getViewportFloat(data: ScaleData): void {
		data.rWidth = data.nWidth * data.scaleFactor;
		data.rHeight = data.nHeight * data.scaleFactor;
		if (data.adaptivity <= 1)
			return;
		data.rWidth = Math.min(data.w, data.rWidth * data.adaptivity);
		data.rHeight = Math.min(data.h, data.rHeight * data.adaptivity);
	}

	private static alignAppView(app: App, data: ScaleData): void {
		if (!(data.fullScreen && data.sameRatios)) {
			app.view.style.left = ((data.iWidth - data.rWidth) / 2 - 4) + 'px';
			app.view.style.top = ((data.iHeight - data.rHeight) / 2 + (data.fullScreen || !data.title ? -4 : 10)) + 'px';
			app.view.style.border = '3px double ' + Color.colorToString(AppSettings.color); //#7777FF';
		} else {
			app.view.style.left = ((data.iWidth - data.rWidth) / 2) + 'px';
			app.view.style.top = ((data.iHeight - data.rHeight) / 2) + 'px';
			app.view.style.border = 'none';
		}
		if (data.fullScreen)
			return;
		const title: HTMLElement = document.getElementById("title");
		if (data.title) {
			title.hidden = false;
			title.style.paddingTop = ((data.iHeight - data.rHeight) / 2 - 30) + 'px';
		} else
			title.hidden = true;
	}

	private static resize(app: App, data: ScaleData): void {
		app.renderer.resize(app.view.width = data.rWidth, app.view.height = data.rHeight);
		AppSettings.scale.factor = app.stage.scale.x = app.stage.scale.y = data.scaleFactor;
	}
}

type ScaleData = {
	nWidth?: number;
	nHeight?: number;
	adaptivity?: number;
	fullScreen?: boolean;
	title?: boolean;

	sameRatios?: boolean;
	scaleFactor?: number;

	iWidth?: number;
	iHeight?: number;

	rWidth?: number;
	rHeight?: number;

	w?: number;
	h?: number;
};