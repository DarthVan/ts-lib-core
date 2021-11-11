/* Generated with TypeScript snippets */

import { Container, DisplayObject, InteractionData, InteractionEvent } from "pixi.js";
import { IUiInput } from "../ui/IUiInput";
import { BasicLabel } from "../ui/label/BasicLabel";
import { ConsoleModule } from "./ConsoleModule";

/** Inspector **
* ...
* @Author Sith
* @Created 2021-06-07
*/

export class Inspector extends ConsoleModule {

	public snapping: number;
	public fullInfo: BasicLabel;

	private _attaches: Map<number, DisplayObject>;
	private _attachID: number;

	private _eventData: InteractionData;
	private _dragging: boolean;
	private _pickPoint: { x: number, y: number };

	public static me: Inspector; // Singleton class !!!

	constructor(input: IUiInput) {
		super("Inspector", input);
		Inspector.me = this;
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public override destroy(): void {
		super.destroy();

		this.fullInfo.destroy();
		this.fullInfo = null;

		this._attaches.forEach((displayObject, key) => {
			this._attaches.delete(key);

			delete (displayObject as any).draggerID;
			this.removeListenersFromObject(displayObject);
			displayObject = null;
		})
		this._attaches.clear();
		this._attaches = null;

		this._eventData = null;
		this._pickPoint = null;
	}

	public override maximize(): void {
		super.maximize();

		this.fullInfo.visible = true;
	}

	public override minimize(): void {
		super.minimize();

		this.fullInfo.visible = false;
	}

	public attach(object: DisplayObject): void {
		if ((object as any).draggerID)
			throw new Error("DisplayObject " + <any>object.constructor.name + " already attached!");

		const id: number = this.generateAttachID();
		this._attaches.set(id, object);
		(object as any).draggerID = id;

		this.addListenersToObject(object);
	}

	public deattach(object: DisplayObject): void {
		if (!(object as any).draggerID)
			throw new Error("DisplayObject " + <any>object.constructor.name + " is not attached!");

		this._attaches.delete((object as any).draggerID);
		delete (object as any).draggerID;
		//console.log((object as any).draggerID);

		this.removeListenersFromObject(object);
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this.fullInfo = new BasicLabel({ color: this._input.color, width: this._input.width - 10, height: this._input.height - 35 });
		this.fullInfo.style.align = "left";
		this.fullInfo.style.fontSize = 16;
		this.fullInfo.style.fill = [this._input.color, this._input.color];
		this.fullInfo.x = 5;
		this.fullInfo.y = 35;
		this.addChild(this.fullInfo);

		this._attaches = new Map<number, DisplayObject>();
		this._attachID = 0;

		this.snapping = 0;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private generateAttachID(): number {
		this._attachID++;
		if (this._attachID > 10000)
			this._attachID = 0;
		return this._attachID;
	}

	private addListenersToObject(object: DisplayObject): void {
		if (object.interactive)
			(object as any).wasInteractived = true;
		else
			object.interactive = true;

		object.on('mousedown', this.onDragStart)
			.on('touchstart', this.onDragStart)
			.on('mouseup', this.onDragEnd)
			.on('mouseupoutside', this.onDragEnd)
			.on('touchend', this.onDragEnd)
			.on('touchendoutside', this.onDragEnd)
			.on('mousemove', this.onDragMove)
			.on('touchmove', this.onDragMove)
			.on('mouseover', this.onMouseOver)
			.on('mouseout', this.onMouseOut);
	}

	private removeListenersFromObject(object: DisplayObject): void {
		if ((object as any).wasInteractived) {
			object.interactive = true;
			delete (object as any).wasInteractived;
		} else
			object.interactive = false;

		object.off('mousedown', this.onDragStart)
			.off('touchstart', this.onDragStart)
			.off('mouseup', this.onDragEnd)
			.off('mouseupoutside', this.onDragEnd)
			.off('touchend', this.onDragEnd)
			.off('touchendoutside', this.onDragEnd)
			.off('mousemove', this.onDragMove)
			.off('touchmove', this.onDragMove)
			.off('mouseover', this.onMouseOver)
			.off('mouseout', this.onMouseOut);
	}

	private onMouseOver(event: InteractionEvent): void {
		event.stopPropagation();
		//console.log('onMouseOver');
		const targetName: string = this.name ? this.name : <any>this.constructor.name;

		Inspector.me.title.text = targetName.substr(0, 9) + ': X:' + Math.round(this.position.x) + ' Y:' + Math.round(this.position.y);

		let tree: string = '';
		let container: Container = this.parent;
		while (container) {
			tree = (container.name ? container.name : <any>container.constructor.name) + '.' + tree;
			container = container.parent;
		}
		tree += targetName;

		Inspector.me.fullInfo.text = tree + ':\n\nbounds width: ' + this._bounds.getRectangle().width
			+ '\nbounds height: ' + this._bounds.getRectangle().height + '\n\n'
			+ 'width: ' + this.width + '\nheight: ' + this.height;
	}

	private onMouseOut(event: InteractionEvent): void {
		event.stopPropagation();
		//console.log('onMouseOut');
		Inspector.me.title.text = 'Inspector';
	}

	private onDragStart(event: InteractionEvent): void {
		event.stopPropagation();

		this._eventData = event.data;
		this.alpha = 0.5;
		this._dragging = true;

		const newPosition: { x: number, y: number } = this._eventData.getLocalPosition(this.parent);
		this._pickPoint = { x: newPosition.x - this.position.x, y: newPosition.y - this.position.y };

		//this._uiInfo.label.text = 'x:' + Math.round(this.position.x) + ' y:' + Math.round(this.position.y);
		//+ '\n' + 'w:' + Math.round(this._bounds.getRectangle().width) + ' h:' + Math.round(this._bounds.getRectangle().height);
	}

	private onDragEnd(event: InteractionEvent): void {
		event.stopPropagation();

		this._dragging = false;
		this.alpha = 1;
		this._eventData = null;
		this._pickPoint = null;
		//console.log(this, ': x =', this.position.x, '; y =', this.position.y);
	}

	private onDragMove(): void {
		if (!this._dragging)
			return;

		let newPosition: { x: number, y: number } = this._eventData.getLocalPosition(this.parent);
		this.x = Math.round(newPosition.x - this._pickPoint.x);
		this.y = Math.round(newPosition.y - this._pickPoint.y);

		// snapping
		const s: number = Inspector.me.snapping;
		if (Inspector.me.snapping > 0) {
			this.position.x = Math.round((newPosition.x - this._pickPoint.x) / s) * s;
			this.position.y = Math.round((newPosition.y - this._pickPoint.y) / s) * s;
		}

		const targetName: string = this.name ? this.name : <any>this.constructor.name;
		Inspector.me.title.text = targetName.substr(0, 9) + ': X:' + Math.round(this.position.x) + ' Y:' + Math.round(this.position.y);

		//this._uiInfo.label.text = 'x:' + Math.round(this.position.x) + ' y:' + Math.round(this.position.y);
		//+ '\n' + 'w:' + Math.round(this._bounds.getRectangle().width) + ' h:' + Math.round(this._bounds.getRectangle().height);
	}

}