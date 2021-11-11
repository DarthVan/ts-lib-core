/* Generated with TypeScript snippets */

import { App } from "./App";
import { AppLanguage } from "./AppLanguage";
import { AppQuality } from "./AppQuality";

/** AppSettings **
* ...
* @Author Sith
* @Created 2021-05-03
*/

export class AppSettings {

	public static resolution: { width: number, height: number };
	public static scale: { method: (app: App) => void, adaptivity?: number, factor?: number };
	public static title: string;
	public static language: AppLanguage;
	public static quality: AppQuality;
	public static color: number;

	private static _options: Map<string, any>;

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public static init(): void {
		this._options = new Map<string, any>();
	}

	public static get options(): Map<string, any> {
		return this._options;
	}

}

export type InputSettings = {

	resolution?: { width: number, height: number },
	scale?: { method: (app: App) => void, adaptivity?: number, factor?: number },
	title?: string,
	language?: AppLanguage,
	quality?: AppQuality,
	color?: number

}