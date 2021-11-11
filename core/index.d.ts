import { Application, Container, Texture, Spritesheet, DisplayObject, Graphics, ITextStyle, Text, utils, Point, Rectangle, Sprite, TilingSprite, InteractionEvent } from "pixi.js";
import { Sound } from "@pixi/sound";
interface IUiInput {
    color?: number;
    width?: number;
    height?: number;
}
declare class Component extends Container {
    constructor();
    destroy(): void;
    resize(size?: {
        w: number;
        h: number;
    }): void;
}
declare class UiComponent<T extends IUiInput> extends Component {
    protected readonly _input: T;
    constructor(input: T);
    resize(size?: {
        w: number;
        h: number;
    }): void;
    show(): void;
    hide(): void;
    activate(): void;
    deactivate(): void;
    reset(): void;
    protected init(): void;
    protected defaults(): void;
}
interface IPreloader extends UiComponent<IUiInput> {
    show(): void;
    hide(): void;
    activate(): void;
    deactivate(): void;
    reset(): void;
    showProgress(data: {
        progress?: number;
        info?: string;
    }): void;
    showError(message?: string): void;
    showTip(text: string): void;
    showBackground(texture?: Texture): void;
    setSound(sound: Sound): void;
}
declare enum AppLanguage {
    ENGLISH = 0,
    RUSSIAN = 1,
    GERMAN = 2,
    FRENCH = 3,
    ITALIAN = 4,
    SPANISH = 5,
    CHINESE = 6
}
declare enum AppQuality {
    CONFIGURED = 0,
    LOW = 1,
    NORMAL = 2,
    HIGH = 3,
    BEST = 4
}
declare class AppSettings {
    static resolution: {
        width: number;
        height: number;
    };
    static scale: {
        method: (app: App) => void;
        adaptivity?: number;
        factor?: number;
    };
    static title: string;
    static language: AppLanguage;
    static quality: AppQuality;
    static color: number;
    private static _options;
    static init(): void;
    static get options(): Map<string, any>;
}
type InputSettings = {
    resolution?: {
        width: number;
        height: number;
    };
    scale?: {
        method: (app: App) => void;
        adaptivity?: number;
        factor?: number;
    };
    title?: string;
    language?: AppLanguage;
    quality?: AppQuality;
    color?: number;
};
declare class App extends Application {
    protected readonly _consoleLayer: Container;
    protected readonly _preloaderLayer: Container;
    protected readonly _contentLayer: Container;
    protected _preloader: IPreloader;
    private static _current;
    constructor(settings?: InputSettings);
    static get current(): App;
    get preloader(): IPreloader;
    get content(): Container;
    protected applySettings(settings?: InputSettings): void;
    protected addPreloader(preloader?: IPreloader): void;
    protected onResize(): void;
    protected onLoadingStart(): void;
    protected onLoadingProgress(data?: any): void;
    protected onLoadingComplete(): void;
    protected onLoadingError(message: string): void;
    private configureHTML5;
}
declare function startApp(appClass: typeof App): void;
declare class AppScale {
    static none(app: App): void;
    static fixed(app: App): void;
    static float(app: App): void;
    private static initScaleData;
    private static getSameRatios;
    private static getScaleFactor;
    private static getViewportFixed;
    private static getViewportFloat;
    private static alignAppView;
    private static resize;
}
interface ITask {
    readonly id: string;
    execute(): void;
    destroy(): void;
    onStart(f: () => void): ITask;
    onProgress(f: (data: any) => void): ITask;
    onComplete(f: (data?: any) => void): ITask;
    onError(f: (message?: string) => void): ITask;
}
interface IAsset {
    readonly id: string;
    source: {
        url: string;
        xhr: any;
    };
    data: any;
    clear: () => void;
}
declare class AssetList {
    readonly id: string;
    readonly map: Map<string, IAsset>;
    constructor(id: string);
    clear(): void;
    add(asset: IAsset): void;
    get(id: string): IAsset;
}
declare class Assets {
    static readonly DEFAULT_LIST: AssetList;
    private static readonly _map;
    private static readonly _taskPool;
    static init(concurrency?: number, preloader?: any): void;
    static addLists(...lists: AssetList[]): void;
    static addAssets(listID: string, ...assets: IAsset[]): void;
    static getList(listID: string): AssetList;
    static getAsset(assetID: string, listID?: string): IAsset;
    static clear(...lists: {
        listID: string;
        assetsID?: Array<string>;
    }[]): void;
    static load(...lists: {
        listID: string;
        assetsID?: Array<string>;
    }[]): ITask;
    static remove(...lists: {
        listID: string;
        assetsID?: Array<string>;
    }[]): void;
    static get map(): Map<string, AssetList>;
    static texture(assetID: string, listID?: string): Texture;
    static spritesheet(assetID: string, listID?: string): Spritesheet;
    static sound(assetID: string, listID?: string): Sound;
    static json(assetID: string, listID?: string): object;
    static text(assetID: string, listID?: string): string;
    static zip(assetID: string, listID?: string): JSZip;
}
declare class Asset implements IAsset {
    readonly id: string;
    protected _source: any;
    protected _data: any;
    constructor(id: string, url?: string);
    clear(): void;
    get source(): {
        url: string;
        xhr: any;
    };
    get data(): any;
    set data(value: any);
    protected init(): void;
}
declare class ZipAsset extends Asset {
    protected init(): void;
}
declare class AssetBundle extends ZipAsset {
}
declare enum AssetType {
    JSON = "json",
    TEXTURE = "texture",
    SPRITESHEET = "spritesheet",
    SOUND = "sound",
    TEXT = "text",
    ZIP = "zip"
}
declare class SoundAsset extends Asset {
    clear(): void;
}
declare class SpriteSheetAsset extends Asset {
    clear(): void;
}
declare class SVGAsset extends Asset {
    clear(): void;
}
declare class TextureAsset extends Asset {
    clear(): void;
}
declare class Color {
    static addColorFilterTo(displayObject: DisplayObject, tint: number, brightness?: number): void;
    static mix(color: number, lightness?: number): number;
    static colorToString(value: number, alpha?: number): string;
    static rgbaToString(value: number): string;
}
interface ILabelInput extends IUiInput {
    text?: string;
    style?: ITextStyle;
}
declare class BasicLabel extends UiComponent<ILabelInput> {
    protected _text: Text;
    protected _style: any;
    protected _line: string;
    constructor(input: ILabelInput);
    destroy(): void;
    resize(size?: {
        w: number;
        h: number;
    }): void;
    show(): void;
    hide(): void;
    activate(): void;
    deactivate(): void;
    reset(): void;
    get text(): string;
    set text(value: string);
    get style(): ITextStyle;
    set style(value: ITextStyle);
    protected init(): void;
    protected addingHiddenLine(): void;
    protected createDefaultStyle(): void;
}
declare class ConsoleExpandButton extends UiComponent<IUiInput> {
    private _arrow;
    private _minimize;
    private _maximize;
    constructor(color: number, minimize: () => void, maximize: () => void);
    destroy(): void;
    showAsMaximized(): void;
    showAsMinimized(): void;
    protected init(): void;
    private onClick;
}
declare class ConsoleModule extends UiComponent<IUiInput> {
    protected _bg: Graphics;
    protected _title: BasicLabel;
    protected _expandButton: ConsoleExpandButton;
    constructor(title: string, input: IUiInput);
    destroy(): void;
    resize(size: {
        w: number;
        h: number;
    }): void;
    maximize(): void;
    minimize(): void;
    get title(): BasicLabel;
    protected init(): void;
}
declare class Commands extends ConsoleModule {
    constructor(input: IUiInput);
    destroy(): void;
    protected init(): void;
}
declare class FPSMeter extends ConsoleModule {
    private _data;
    private _graphics;
    private _grid;
    private _intervalID;
    private readonly _updateTime;
    private readonly _valuesNum;
    constructor(input: IUiInput);
    destroy(): void;
    maximize(): void;
    minimize(): void;
    protected init(): void;
    private onInterval;
}
declare class Inspector extends ConsoleModule {
    snapping: number;
    fullInfo: BasicLabel;
    private _attaches;
    private _attachID;
    private _eventData;
    private _dragging;
    private _pickPoint;
    static me: Inspector;
    constructor(input: IUiInput);
    destroy(): void;
    maximize(): void;
    minimize(): void;
    attach(object: DisplayObject): void;
    deattach(object: DisplayObject): void;
    protected init(): void;
    private generateAttachID;
    private addListenersToObject;
    private removeListenersFromObject;
    private onMouseOver;
    private onMouseOut;
    private onDragStart;
    private onDragEnd;
    private onDragMove;
}
declare class Scroll extends UiComponent<IUiInput> {
    private _rectangle;
    private _container;
    private _containerMask;
    private _border;
    private _scrollBarV;
    private _scrollBarH;
    private _overfilledX;
    private _overfilledY;
    private _bind;
    constructor(input: IUiInput);
    destroy(): void;
    verticalOnly(): void;
    horizontalOnly(): void;
    scrollToX(value: number): void;
    scrollToY(value: number): void;
    get container(): Container;
    update(): void;
    get border(): boolean;
    set border(value: boolean);
    protected init(): void;
    private onSomethingAdded;
    private onSomethingRemoved;
    private onMouseOver;
    private onMouseOut;
    private onMouseWheel;
}
declare class Messages extends ConsoleModule {
    private _scroll;
    constructor(input: IUiInput);
    destroy(): void;
    maximize(): void;
    minimize(): void;
    get scroll(): Scroll;
    protected init(): void;
}
declare class Console {
    private static _fpsMeter;
    private static _inspector;
    private static _commands;
    private static _messages;
    private static _container;
    constructor();
    static init(container: Container): void;
    static destroy(): void;
    static get fpsMeter(): FPSMeter;
    static get inspector(): Inspector;
    static get commands(): ConsoleModule;
    static get messages(): Messages;
    static log(message: string): void;
    static error(message: string): void;
    static info(object: DisplayObject): void;
    static addModule(consoleModule: ConsoleModule): void;
}
declare class Controller {
    protected _view: DisplayObject;
    constructor(view: DisplayObject, ...args: any[]);
    destroy(): void;
    enable(): void;
    disable(): void;
}
declare class Model extends utils.EventEmitter {
    constructor();
    destroy(): void;
    onUpdate(): void;
    protected onValueUpdate(): void;
}
declare class Module extends Component {
    constructor();
    destroy(): void;
    protected init(): void;
}
declare enum AlignType {
    CENTER = 0,
    CENTER_LEFT = 1,
    CENTER_RIGHT = 2,
    TOP_CENTER = 3,
    TOP_LEFT = 4,
    TOP_RIGHT = 5,
    BOTTOM_CENTER = 6,
    BOTTOM_LEFT = 7,
    BOTTOM_RIGHT = 8
}
interface IAlignGroup {
    readonly id: string;
    updateX(): void;
    updateY(): void;
    destroy(): void;
}
declare class AlignGroup implements IAlignGroup {
    readonly id: string;
    protected _views: Array<DisplayObject>;
    protected _rect: Rectangle;
    protected _options: Options;
    protected _backup: Array<Point>;
    protected _sf: number;
    private readonly _updatesX;
    private readonly _updatesY;
    constructor(id: string, views: Array<DisplayObject>, rect: Rectangle, options?: Options);
    destroy(): void;
    updateX(): void;
    updateY(): void;
    protected updateByLeftX(): void;
    protected updateByCenterX(): void;
    protected updateByRightX(): void;
    protected updateByTopY(): void;
    protected updateByCenterY(): void;
    protected updateByBottomY(): void;
    protected alignX(curX: number): void;
    protected alignY(curY: number): void;
}
type Options = {
    align?: AlignType;
    offsetX?: number;
    offsetY?: number;
    padX?: number;
    padY?: number;
    shiftX?: number;
    shiftY?: number;
};
declare class MapPool<Type> {
    protected _map: Map<string, Type>;
    constructor();
    destroy(): void;
    add(id: string, object: Type): void;
    remove(id: string): void;
    get(id: string): Type;
    get length(): number;
}
declare class AlignPool extends MapPool<IAlignGroup> {
    destroy(): void;
    updateX(): void;
    updateY(): void;
    update(): void;
}
declare class LinearAlignGroup extends AlignGroup {
    protected updateByLeftX(): void;
    protected updateByCenterX(): void;
    protected updateByRightX(): void;
    protected updateByTopY(): void;
    protected updateByCenterY(): void;
    protected updateByBottomY(): void;
    protected alignX(curX: number, centered?: boolean): void;
    protected alignY(curY: number): void;
}
declare class ArrayPool<Type> {
    protected _array: Array<Type>;
    constructor();
    destroy(): void;
    add(object: Type): void;
    remove(object: Type): void;
    get length(): number;
}
declare class Task implements ITask {
    readonly id: string;
    protected _onStart: () => void;
    protected _onProgress: (data: any) => void;
    protected _onComplete: (data?: any) => void;
    protected _onError: (message?: string) => void;
    constructor(id: string);
    destroy(): void;
    execute(): void;
    onStart(f: () => void): ITask;
    onProgress(f: (data: any) => void): ITask;
    onComplete(f: (data?: any) => void): ITask;
    onError(f: (message?: string) => void): ITask;
    protected success(data?: any): void;
    protected failed(message?: string): void;
    private startNextTask;
}
declare class TaskPool extends ArrayPool<ITask> {
    private _autoExecute;
    private _busy;
    private _onAllComplete;
    private _onAllProgress;
    private _total;
    private _skipBusyState;
    private _tasksInProgress;
    constructor(autoExecute?: boolean, skipBusyState?: boolean);
    destroy(): void;
    add(object: ITask): void;
    execute(onAllComplete?: () => void, onAllProgress?: (data: any) => void): void;
    private next;
}
declare class BasicProgressBar extends UiComponent<IUiInput> {
    protected _background: Sprite;
    protected _tiledFill: TilingSprite;
    protected _fillMask: Sprite;
    protected _info: BasicLabel;
    protected _style: any;
    constructor(input: IUiInput);
    destroy(): void;
    reset(): void;
    showProgress(data: {
        progress?: number;
        info?: string;
    }): void;
    showError(message?: string): void;
}
declare class CodeProgressBar extends BasicProgressBar {
    private _barLight;
    private _lightDelay;
    destroy(): void;
    show(): void;
    hide(): void;
    showProgress(data: {
        progress?: number;
        info?: string;
    }): void;
    showError(message?: string): void;
    activate(): void;
    deactivate(): void;
    reset(): void;
    protected init(): void;
    private onTicker;
    private onLightTicker;
}
interface IButtonInput extends IUiInput {
    normal?: DisplayObject;
    over?: DisplayObject;
    down?: DisplayObject;
    text?: string;
    icon?: DisplayObject;
    soundOver?: Sound;
    soundDown?: Sound;
}
declare class BasicButton extends UiComponent<IButtonInput> {
    protected _normal: DisplayObject;
    protected _over: DisplayObject;
    protected _down: DisplayObject;
    protected _label: BasicLabel;
    protected _icon: DisplayObject;
    protected _soundOver: Sound;
    protected _soundDown: Sound;
    private _isOver;
    constructor(input: IButtonInput);
    destroy(): void;
    get label(): BasicLabel;
    get text(): string;
    set text(value: string);
    get icon(): DisplayObject;
    set icon(value: DisplayObject);
    get normal(): DisplayObject;
    set normal(value: DisplayObject);
    get over(): DisplayObject;
    set over(value: DisplayObject);
    get down(): DisplayObject;
    set down(value: DisplayObject);
    get soundOver(): Sound;
    set soundOver(value: Sound);
    get soundDown(): Sound;
    set soundDown(value: Sound);
    protected defaults(): void;
    protected init(): void;
    protected onPress(event: InteractionEvent): void;
    protected onRelease(event: InteractionEvent): void;
    protected onOver(event: InteractionEvent): void;
    protected onOut(event: InteractionEvent): void;
}
interface ICodeButtonInput extends IButtonInput {
    alpha?: number;
    radius?: number;
}
declare class CodeButton extends BasicButton {
    private _background;
    constructor(input: ICodeButtonInput);
    destroy(): void;
    protected init(): void;
    private drawRoundRectangle;
    private drawGlassRoundRect;
    private drawLightGlassRoundRect;
    private drawDarkGlassRoundRect;
}
declare class BasicPreloader extends UiComponent<IUiInput> implements IPreloader {
    protected _background: Sprite;
    protected _bar: BasicProgressBar;
    constructor(input: IUiInput);
    destroy(): void;
    resize(size?: {
        w: number;
        h: number;
    }): void;
    show(): void;
    hide(): void;
    showProgress(data: {
        progress?: number;
        info?: string;
    }): void;
    showError(message?: string): void;
    showTip(text: string): void;
    showBackground(texture?: Texture): void;
    setSound(sound: Sound): void;
    protected init(): void;
}
declare class CodePreloader extends BasicPreloader {
    resize(size?: {
        w: number;
        h: number;
    }): void;
    protected init(): void;
}
declare class ScrollBar extends UiComponent<IUiInput> {
    private _bar;
    private _relation;
    private _isHorizontal;
    constructor(input: IUiInput);
    destroy(): void;
    get relation(): number;
    set relation(value: number);
    protected init(): void;
    private drawHorizontal;
    private drawVertical;
}
declare class ScrollHandle extends BasicButton {
    constructor(input: IButtonInput);
    destroy(): void;
    protected init(): void;
}
declare function getFileFolder(file: string): string;
declare function addPixiEnvironment(): void;
declare class BasicWorker {
    constructor();
    protected addLibs(): void;
    protected onData(taskID: number, data: any): void;
    private onMessageReceived;
}
declare function startWorker(workerClass: typeof BasicWorker): void;
declare class WorkerCallBack {
    protected _onStart: () => void;
    protected _onProgress: (progress: number) => void;
    protected _onComplete: (data?: any) => void;
    protected _onError: (message?: string) => void;
    constructor();
    destroy(): void;
    onStart(f: () => void): WorkerCallBack;
    onProgress(f: (progress: number) => void): WorkerCallBack;
    onComplete(f: (data?: any) => void): WorkerCallBack;
    onError(f: (message?: string) => boolean): WorkerCallBack;
    start(): void;
    progress(progress: number): void;
    complete(data?: any): void;
    error(message?: string): void;
}
declare class WorkerBox {
    private readonly _js;
    private readonly _multithreading;
    private readonly _taskArray;
    private readonly _workers;
    private readonly _handlers;
    private _onResponse;
    private _n;
    constructor(js: string, multithreading: boolean);
    destroy(): void;
    addTask(data: any): WorkerCallBack;
    cancel(): void;
    private executeNextTask;
    private onWorkerResponse;
    private onStart;
    private onProgress;
    private onComplete;
    private onError;
    private addWorker;
    private removeWorker;
    private removeFreeWorkers;
    private removeAllWorkers;
    private getCallBack;
    private get n();
}
declare enum WorkerMessageType {
    SET_DATA = 0,
    ON_START = 1,
    ON_PROGRESS = 2,
    ON_COMPLETE = 3,
    ON_ERROR = 4
}
declare class WorkerMessage {
    readonly type: WorkerMessageType;
    readonly id: number;
    readonly data: any;
    constructor(type: WorkerMessageType, id: number, data?: any);
    static onData(taskID: number, data: any): WorkerMessage;
    static onStart(taskID: number, data?: any): WorkerMessage;
    static onProgress(taskID: number, data?: any): WorkerMessage;
    static onComplete(taskID: number, data?: any): WorkerMessage;
    static onError(taskID: number, data?: any): WorkerMessage;
}
declare class Workers {
    protected static _boxMap: Map<string, WorkerBox>;
    static init(maxThreads?: number): void;
    static addBox(boxID: string, js: string, multithreading?: boolean): void;
    static removeBox(boxID: string): void;
    static cancelBox(boxID: string): void;
    static addTask(boxID: string, data: any): WorkerCallBack;
    static isBoxActive(boxID: string): boolean;
}
declare class WorkerThreadsNum {
    static MAX: number;
    static CURRENT: number;
}
export { App, startApp, AppLanguage, AppQuality, AppScale, AppSettings, InputSettings, Assets, AssetList, Asset, AssetBundle, AssetType, IAsset, SoundAsset, SpriteSheetAsset, SVGAsset, TextureAsset, ZipAsset, Color, Commands, Console, ConsoleModule, FPSMeter, Inspector, Messages, Controller, Model, Component, Module, AlignGroup, AlignPool, AlignType, IAlignGroup, LinearAlignGroup, ArrayPool, MapPool, ITask, Task, TaskPool, BasicProgressBar, CodeProgressBar, BasicButton, CodeButton, BasicLabel, BasicPreloader, CodePreloader, IPreloader, Scroll, ScrollBar, ScrollHandle, getFileFolder, addPixiEnvironment, BasicWorker, startWorker, WorkerBox, WorkerCallBack, WorkerMessage, WorkerMessageType, Workers, WorkerThreadsNum };
