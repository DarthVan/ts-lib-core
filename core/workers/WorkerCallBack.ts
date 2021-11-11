/* Generated with TypeScript snippets */

/** WorkerCallBack **
* ...
* @Author Sith
* @Created 2020-12-10
*/

export class WorkerCallBack {

	protected _onStart: () => void;
	protected _onProgress: (progress: number) => void;
	protected _onComplete: (data?: any) => void;
	protected _onError: (message?: string) => void;

	constructor() {
	}

	//-------------------------------------------------- PUBLIC --------------------------------------------------

	public destroy(): void {
		this._onStart = null;
		this._onProgress = null;
		this._onComplete = null;
		this._onError = null;
	}

	public onStart(f: () => void): WorkerCallBack {
		this._onStart = f;
		return this;
	}

	public onProgress(f: (progress: number) => void): WorkerCallBack {
		this._onProgress = f;
		return this;
	}

	public onComplete(f: (data?: any) => void): WorkerCallBack {
		this._onComplete = f;
		return this;
	}

	public onError(f: (message?: string) => boolean): WorkerCallBack {
		this._onError = f;
		return this;
	}

	public start(): void {
		if (this._onStart)
			this._onStart();
	}

	public progress(progress: number): void {
		if (this._onProgress)
			this._onProgress(progress);
	}

	public complete(data?: any): void {
		if (this._onComplete)
			this._onComplete(data);
	}

	public error(message?: string): void {
		if (this._onError)
			this._onError(message);
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	//-------------------------------------------------- PRIVATE --------------------------------------------------

}