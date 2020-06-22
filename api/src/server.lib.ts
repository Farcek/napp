import { AInterface, IHandleInstance, IRequestParam } from "./core";

export interface IMiddleware {
    (req: any, res: any, next: any): void;
}


export interface IContext {
    req: any
    res: any
}

interface IAction<RES, BParam, PParam, QParam> {
    (param: Required<IRequestParam<BParam, PParam, QParam>>, ctx: IContext): Promise<RES>
}
interface IValidation<BParam, PParam, QParam> {
    (param: IRequestParam<BParam, PParam, QParam>, ctx: IContext): Promise<void>
}

export interface OAPIHandler<RES, BParam, PParam, QParam> {
    befores?: IMiddleware[];
    validation?: IValidation<BParam, PParam, QParam>;
    action: IAction<RES, BParam, PParam, QParam>;
}

export class AHandler<RES, BParam, PParam, QParam> {
    constructor(
        private meta: AInterface<RES, BParam, PParam, QParam>,
        private opt: OAPIHandler<RES, BParam, PParam, QParam>) {

    }

    public getOptions() {
        return {
            meta: this.meta,
            befores: this.opt.befores || [],
            validation: this.opt.validation,
            action: this.opt.action
        }
    }
}

function buildHandleInstance(v: string): IHandleInstance {

    return {
        str: () => '' + v,
        num: () => Number(v),
        date: () => new Date(v),
        bool: () => (v === 'true' || v === '1' || v === 'ok') ? true : false
    }

}

class AHandlerWrap<RES, BParam, PParam, QParam> {

    private meta: AInterface<RES, BParam, PParam, QParam>;

    private _validation?: IValidation<BParam, PParam, QParam>;;
    private _action: IAction<RES, BParam, PParam, QParam>;
    private _befores: IMiddleware[];

    constructor(handler: AHandler<RES, BParam, PParam, QParam>) {
        let $ = handler.getOptions();
        this.meta = $.meta;
        this._validation = $.validation;
        this._action = $.action;
        this._befores = $.befores;
    }


    get name() {
        return this.meta.name;
    }

    get path() {
        return this.meta.path || '/' + this.meta.name;
    }

    get method() {
        return this.meta.method || 'get';
    }
    getBefores() {
        return this._befores || [];
    }




    private buildQParam(req: any): QParam {
        let qParam = req.query || {};
        if (this.meta.pipe && this.meta.pipe.query) {
            if (this.meta.pipe.query.request2param) {

                return this.meta.pipe.query.request2param({
                    req: qParam,
                    handle: (name: any) => buildHandleInstance(req.query[name]),
                    has: (name: any) => name in qParam
                });
            }
        }
        return qParam;
    }
    private buildPParam(req: any): PParam {
        let pParam = req.params || {};
        if (this.meta.pipe && this.meta.pipe.path) {
            if (this.meta.pipe.path.request2param) {

                return this.meta.pipe.path.request2param({
                    req: pParam,
                    handle: (name: any) => buildHandleInstance(req.query[name]),
                    has: (name: any) => name in pParam
                });
            }
        }
        return pParam;
    }
    private buildBParam(req: any): BParam {
        let bParam = req.body || {};
        if (this.meta.pipe && this.meta.pipe.body) {
            if (this.meta.pipe.body.request2param) {

                return this.meta.pipe.body.request2param({
                    req: bParam,
                    handle: (name: any) => buildHandleInstance(req.query[name]),
                    has: (name: any) => name in bParam
                });
            }
        }
        return bParam;
    }
    private buildRQParam(req: any): Required<IRequestParam<BParam, PParam, QParam>> {

        let query = this.buildQParam(req);
        let path = this.buildPParam(req);
        let body = this.buildBParam(req);

        return { query, path, body };
    }

    action(req: any, res: any, next: any, errorHandle?: (error: any, req: any, res: any, next: any) => void) {

        this.doAction(req, res, next)
            .then(result => res.json(result))
            .catch(err => {
                if (errorHandle) {
                    return errorHandle(err, req, res, next);
                }
                next(err);
            })
    }

    private async doAction(req: any, res: any, next: any) {
        let params = this.buildRQParam(req);

        if (this.meta.validation) {
            this.meta.validation(params)
        }
        let ctx: IContext = {
            req, res
        }
        if (this._validation) {
            await this._validation(params, ctx);
        }

        let result = await this._action(params, ctx);
        return result;
    }
}

export interface IModuleOption {
    logger?: (name: string, dta: object) => void;
    errorHandle?: (error: any, req: any, res: any, next: any) => void;
}

export class AModule {

    constructor(
        private name: string,
        private opt: IModuleOption
    ) {

    }

    private _handlers = new Map<string, AHandlerWrap<any, any, any, any>>();


    register(...handlers: AHandler<any, any, any, any>[]) {

        for (let h of handlers) {
            this._register(h);
        }

        return this;
    }

    private _register(handler: AHandler<any, any, any, any>) {

        let w = new AHandlerWrap(handler);

        if (this._handlers.has(w.name)) {
            throw new Error(`registered "${w.name}" the handler`);
        }

        this._handlers.set(w.name, w);

        return this;
    }

    log(name: string, dta: any) {
        let { logger } = this.opt;
        if (logger) {
            logger(name, dta);
        }
    }

    setup(app: any) {
        this.log('setup.module', { name: this.name });
        this._handlers.forEach((wrap) => {
            this._setup(app, wrap);
        })

        return app;
    }




    private _setup(app: any, wrap: AHandlerWrap<any, any, any, any>) {

        let name = wrap.name;
        let path = wrap.path;
        let method = wrap.method;
        let errorHandle = this.opt.errorHandle;

        let befores = wrap.getBefores();

        if (method === 'get') {
            app.get(path, befores, (req: any, res: any, next: any) => wrap.action(req, res, next, errorHandle))
        } else if (method === 'post') {
            app.post(path, befores, (req: any, res: any, next: any) => wrap.action(req, res, next, errorHandle))
        } else if (method === 'del') {
            app.delete(path, befores, (req: any, res: any, next: any) => wrap.action(req, res, next, errorHandle))
        } else if (method === 'put') {
            app.put(path, befores, (req: any, res: any, next: any) => wrap.action(req, res, next, errorHandle))
        } else {
            throw new Error("not suppoered method. handler = " + name);
        }

        this.log('setup.action', { name, method, path });
    }
}