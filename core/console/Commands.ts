/* Generated with TypeScript snippets */

import { IUiInput } from "../ui/IUiInput";
import { ConsoleModule } from "./ConsoleModule";

/** Commands **
* ...
* @Author Sith
* @Created 2021-06-26
*/

export class Commands extends ConsoleModule {

	constructor(input: IUiInput) {
		super("Commands", input);
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override destroy(): void {
		super.destroy();
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}