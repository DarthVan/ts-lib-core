/* Generated with TypeScript snippets */

import { Sound } from "@pixi/sound";
import { DisplayObject } from "pixi.js";
import { IUiInput } from "../IUiInput";

/** IButtonInput **
* ...
* @Author Sith
* @Created 2021-06-26
*/

export interface IButtonInput extends IUiInput {

	normal?: DisplayObject;
	over?: DisplayObject;
	down?: DisplayObject;

	text?: string;
	icon?: DisplayObject;

	soundOver?: Sound;
	soundDown?: Sound;

}