/* Generated with TypeScript snippets */

import { Sound } from '@pixi/sound';
import { Texture } from 'pixi.js';
import { IUiInput } from '../IUiInput';
import { UiComponent } from '../UiComponent';

/** IPreloader **
* ...
* @Author Sith
* @Created 2021-03-28
*/

export interface IPreloader extends UiComponent<IUiInput> {

	show(): void;
	hide(): void;
	activate(): void;
	deactivate(): void;
	reset(): void;

	showProgress(data: { progress?: number, info?: string }): void;
	showError(message?: string): void;
	showTip(text: string): void;
	showBackground(texture?: Texture): void;
	setSound(sound: Sound): void;

}