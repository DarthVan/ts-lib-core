/* Generated with TypeScript snippets */

import { CodeButton } from "../ui/button/CodeButton";
import { IUiInput } from "../ui/IUiInput";
import { Scroll } from "../ui/scroll/Scroll";
import { ConsoleModule } from "./ConsoleModule";

/** Messages **
* ...
* @Author Sith
* @Created 2021-06-09
*/

export class Messages extends ConsoleModule {

	private _scroll: Scroll;

	constructor(input: IUiInput) {
		super("Messages", input);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override destroy(): void {
		super.destroy();

		this._scroll.destroy();
		this._scroll = null;
	}

	public override maximize(): void {
		super.maximize();

		this._scroll.visible = true;
	}

	public override minimize(): void {
		super.minimize();

		this._scroll.visible = false;
	}

	public get scroll(): Scroll {
		return this._scroll;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._scroll = new Scroll({ color: this._input.color, width: this._input.width - 20, height: this._input.height - 40 });
		this._scroll.x = 10;
		this._scroll.y = 30;
		this.addChild(this._scroll);

		let btnBlue: CodeButton = new CodeButton({ color: 0x0000FF, width: 400, height: 120, text: 'Blue button' });
		btnBlue.x = this._input.width - 420;
		btnBlue.y = this._input.height - 180;
		this.addChild(btnBlue);

		let advButton: CodeButton = new CodeButton({ color: 0xFF0000, width: 400, height: 60, text: 'Advanced button' });
		advButton.x = this._input.width - 420;
		advButton.y = this._input.height - 250;
		this.addChild(advButton);

		let handle: CodeButton = new CodeButton({ color: 0xFFFF00, width: 20, height: 200, text: '' });
		handle.x = this._input.width - 250;
		handle.y = this._input.height - 460;
		this.addChild(handle);

		let rect: CodeButton = new CodeButton({ color: 0x44FF44, width: 200, height: 200, text: 'A' });
		rect.x = this._input.width - 220;
		rect.y = this._input.height - 460;
		this.addChild(rect);
	}


	//-------------------------------------------------- PRIVATE --------------------------------------------------

}