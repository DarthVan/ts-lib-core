/* Generated with TypeScript snippets */

import { Container, DisplayObject } from "pixi.js";
import { AppSettings } from "../app/AppSettings";
import { Commands } from "./Commands";
import { ConsoleModule } from "./ConsoleModule";
import { FPSMeter } from "./FPSMeter";
import { Inspector } from "./Inspector";
import { Messages } from "./Messages";

/** Console **
* ...
* @Author Sith
* @Created 2021-05-01
*/

export class Console {

	private static _fpsMeter: FPSMeter;
	private static _inspector: Inspector;
	private static _commands: ConsoleModule;
	private static _messages: Messages;

	private static _container: Container;

	constructor() {

	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public static init(container: Container): void {
		this._container = container;

		this._messages = new Messages({ color: AppSettings.color, width: 900, height: 500 });
		this._container.addChild(this._messages);
		this._messages.x = 0;
		this._messages.y = 30;

		this._fpsMeter = new FPSMeter({ color: AppSettings.color, width: 200, height: 150 });
		this._container.addChild(this._fpsMeter);
		this._fpsMeter.x = 0;
		this._fpsMeter.y = 0;

		this._inspector = new Inspector({ color: AppSettings.color, width: 300, height: 150 });
		this._container.addChild(this._inspector);
		this._inspector.x = 200;
		this._inspector.y = 0;

		this._commands = new Commands({ color: AppSettings.color, width: 400, height: 500 });
		this._container.addChild(this._commands);
		this._commands.x = 500;
		this._commands.y = 0;


		this._inspector.attach(this._fpsMeter);
		this._inspector.attach(this._inspector);
		this._inspector.attach(this._messages);
		this._inspector.attach(this._commands);
		this._inspector.snapping = 10;

		console.log('Console initialized.');
	}

	public static destroy(): void {
		this._fpsMeter.destroy();
		this._fpsMeter = null;

		this._inspector.destroy();
		this._inspector = null;

		this._commands.destroy();
		this._commands = null;

		this._messages.destroy();
		this._messages = null;
	}

	public static get fpsMeter(): FPSMeter {
		return this._fpsMeter;
	}

	public static get inspector(): Inspector {
		return this._inspector;
	}

	public static get commands(): ConsoleModule {
		return this._commands;
	}

	public static get messages(): Messages {
		return this._messages;
	}

	public static log(message: string): void {

	}

	public static error(message: string): void {

	}

	public static info(object: DisplayObject): void {

	}

	public static addModule(consoleModule: ConsoleModule): void {
		this._container.addChild(consoleModule);
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}