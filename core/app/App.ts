/* Generated with TypeScript snippets */

import { Application, Container } from "pixi.js";
import { Assets } from "../assets/Assets";
import { Color } from "../color/Color";
import { Console } from "../console/Console";
import { CodePreloader } from "../ui/preloader/CodePreloader";
import { IPreloader } from "../ui/preloader/IPreloader";
import { Workers } from "../workers/Workers";
import { AppLanguage } from "./AppLanguage";
import { AppQuality } from "./AppQuality";
import { AppScale } from "./AppScale";
import { AppSettings, InputSettings } from "./AppSettings";


/** App **
* Extends class sample:
*
* import { App, startApp } from "../lib/core/app/App";
* 
* export class MyApp extends App {
* 	constructor() {
* 		super({
* 			resolution: { width: 1920, height: 1080 },
* 			scale: { method: AppScale.float.bind(AppScale), adaptivity: 1.2 },
* 			title: "My App",
* 			quality: AppQuality.BEST,
* 			language: AppLanguage.ENGLISH,
* 			color: 0x7777FF
* 		});
* 		this.addPreloader();
* 	}
* }
* 
* startApp(MyApp);
* ...
* @author Sith
* @created 2020-08-17
*/

export class App extends Application {

	protected readonly _consoleLayer: Container;
	protected readonly _preloaderLayer: Container;
	protected readonly _contentLayer: Container;

	protected _preloader: IPreloader;

	private static _current: App;

	constructor(settings?: InputSettings) {
		super({ antialias: false });

		App._current = this;

		AppSettings.init();
		this.applySettings(settings);

		this.stage.name = 'stage';

		this._contentLayer = new Container();
		this._contentLayer.name = 'content';
		this.stage.addChild(this._contentLayer);

		this._preloaderLayer = new Container();
		this._preloaderLayer.name = 'preloader';
		this.stage.addChild(this._preloaderLayer);

		this._consoleLayer = new Container();
		this._consoleLayer.name = 'console';
		this.stage.addChild(this._consoleLayer);

		Console.init(this._consoleLayer);

		this.configureHTML5();

		window.addEventListener('resize', this.onResize.bind(this));
		this.onResize();

		Assets.init();
		Workers.init();

		console.log('App starting...');
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public static get current(): App {
		return this._current;
	}

	public get preloader(): IPreloader {
		return this._preloader;
	}

	public get content(): Container {
		return this._contentLayer;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected applySettings(settings?: InputSettings): void {
		AppSettings.resolution = settings?.resolution ? settings.resolution : { width: 1920, height: 1080 };
		AppSettings.scale = settings?.scale ? settings.scale : { method: AppScale.none.bind(AppScale), adaptivity: 1 };
		AppSettings.title = settings?.title ? settings.title : 'My App';
		AppSettings.language = settings?.language ? settings.language : AppLanguage.ENGLISH;
		AppSettings.quality = settings?.quality ? settings.quality : AppQuality.NORMAL;
		AppSettings.color = settings?.color ? settings.color : 0x7777FF;
	}

	protected addPreloader(preloader?: IPreloader): void {
		if (this._preloader)
			this._preloader.destroy();

		if (preloader)
			this._preloader = preloader;
		else
			this._preloader = new CodePreloader({
				color: AppSettings.color,
				width: AppSettings.resolution.width,
				height: AppSettings.resolution.height
			});

		this._preloaderLayer.addChild(this._preloader);
		this._preloader.hide();

		setTimeout(this.onResize.bind(this), 0);
	}

	protected onResize(): void {
		AppSettings.scale.method(this);

		if (this._preloader)
			this._preloader.resize({ w: this.renderer.width / AppSettings.scale.factor, h: this.renderer.height / AppSettings.scale.factor });
	}

	protected onLoadingStart(): void {
		if (this._preloader)
			this._preloader.show();
	}

	protected onLoadingProgress(data?: any): void {
		if (!this._preloader)
			return;

		let progress: number;
		if (!data.taskID)
			progress = (data.value / 2) / 100;
		else
			progress = (50 + data.value / 2) / 100;

		this._preloader.showProgress({ progress: progress, info: data.action });
	}

	protected onLoadingComplete(): void {
		if (this._preloader)
			this._preloader.hide();
	}

	protected onLoadingError(message: string): void {
		if (this._preloader)
			this._preloader.showError(message);
		console.log('Error:', message);
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private configureHTML5(): void {
		this.view.style.position = 'absolute';

		const title: HTMLElement = document.getElementById("title");
		title.textContent = AppSettings.title;
		title.style.color = Color.colorToString(AppSettings.color);

		const htmlHeadElement: HTMLHeadElement = document.getElementsByTagName("head")[0];
		htmlHeadElement.firstChild.nextSibling.firstChild.nodeValue = AppSettings.title;
		htmlHeadElement.lastChild.previousSibling.lastChild.textContent =
			'html, body {margin: 0; padding: 0; width: 100%; height: 100%; background: ' +
			Color.colorToString(Color.mix(AppSettings.color, -0.9)) + '; overflow: hidden;}';
	}

}


/** Launches application on 'window.onload' event. Call this in main App's class */
export function startApp(appClass: typeof App): void {

	let app: App;

	window.onload = () => {
		app = new appClass();
		app.start();
		document.getElementById("app").appendChild(app.view);
		//document.styleSheets
		// Dynamic creation:

		/* let header: HTMLHeadingElement = document.body.appendChild(document.createElement('h1'));
		header.id = "title";
		header.style.fontFamily = "Consolas";
		header.style.fontStyle = "italic";
		header.style.fontSize = "20px";
		header.style.textAlign = "center";
		header.style.color = "#7777FF";
		header.textContent = title;

		let element: HTMLCanvasElement = document.body.appendChild(app.view);
		element.parentNode.replaceChild(element, element.parentNode.childNodes[0]); */
	}

	window.onunload = () => {
		app.destroy(true, { children: true });
	}

}