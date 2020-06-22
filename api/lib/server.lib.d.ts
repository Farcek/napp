import { AInterface, IRequestParam } from "./core";
export interface IMiddleware {
    (req: any, res: any, next: any): void;
}
export interface IContext {
    req: any;
    res: any;
}
interface IAction<RES, BParam, PParam, QParam> {
    (param: Required<IRequestParam<BParam, PParam, QParam>>, ctx: IContext): Promise<RES>;
}
interface IValidation<BParam, PParam, QParam> {
    (param: IRequestParam<BParam, PParam, QParam>, ctx: IContext): Promise<void>;
}
export interface OAPIHandler<RES, BParam, PParam, QParam> {
    befores?: IMiddleware[];
    validation?: IValidation<BParam, PParam, QParam>;
    action: IAction<RES, BParam, PParam, QParam>;
}
export declare class AHandler<RES, BParam, PParam, QParam> {
    private meta;
    private opt;
    constructor(meta: AInterface<RES, BParam, PParam, QParam>, opt: OAPIHandler<RES, BParam, PParam, QParam>);
    getOptions(): {
        meta: AInterface<RES, BParam, PParam, QParam>;
        befores: IMiddleware[];
        validation: IValidation<BParam, PParam, QParam> | undefined;
        action: IAction<RES, BParam, PParam, QParam>;
    };
}
export interface IModuleOption {
    logger?: (name: string, dta: object) => void;
    errorHandle?: (error: any, req: any, res: any, next: any) => void;
}
export declare class AModule {
    private name;
    private opt;
    constructor(name: string, opt: IModuleOption);
    private _handlers;
    register(...handlers: AHandler<any, any, any, any>[]): this;
    private _register;
    log(name: string, dta: any): void;
    setup(app: any): any;
    private _setup;
}
export {};
//# sourceMappingURL=server.lib.d.ts.map