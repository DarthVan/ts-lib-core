/** Get class name by 'this' + ': ' for console and throws */
/* export function nameOfThis(arg: any, dots: boolean = true): string {
	let name: string = <any>arg.constructor.name;
	if (!name || name == '' || 'Function')
		return <any>arg + dots ? ': ' : ''; // for static class
	return name + dots ? ': ' : '';
} */

/** Returns file's folder(s) */
export function getFileFolder(file: string): string {
	if (!file.indexOf('/'))
		return '';
	return file.substring(0, file.lastIndexOf("/") + 1);
}

/** Creates environment for PIXI lib (add to worker's script) */
export function addPixiEnvironment(): void {
	globalThis.window = <any>self;
	globalThis.document = {
		createElement() {
			return {
				getContext() {
					return {
						fillRect() { },
						drawImage() { },
						getImageData() { },
					}
				},
			}
		},
	} as any;
}