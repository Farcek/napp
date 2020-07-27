export interface IFilterParam {
    actionResult: any;
    expressRes: any;
    expressReq: any;
    handled: boolean;

    refilter: (result: any) => Promise<void>;
}

export interface IResponseFilter {
    filter(param: IFilterParam): void | Promise<void>
}


export interface IMiddleware {
    (req: any, res: any, next: any): void;
}


export interface IContext {
    req: any;
    res: any;

}

export interface IAction<REQ, RES> {
    (param: REQ, ctx: IContext): Promise<RES>
}

export interface IValidation<REQ> {
    (param: REQ, ctx: IContext): Promise<void>
}

export interface IErrorHandle {
    (error: any): any
}