import { AInterface, HttpParam } from "@napp/api-core";
import { IValidation, IMiddleware, IAction, IContext, IFilterParam, IErrorHandle } from "./common";
import { AModule } from "./module";
import { OAPIHandler } from "./action.common";


export class AHandler<REQ, RES> {
    constructor(
        private meta: AInterface<REQ, RES>,
        private opt: OAPIHandler<REQ, RES>) {

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

export class AHandlerWrap<REQ, RES> {

    private meta: AInterface<REQ, RES>;

    private _validation?: IValidation<REQ>;
    private _action: IAction<REQ, RES>;
    private _befores: IMiddleware[];

    constructor(
        private module: AModule,
        handler: AHandler<REQ, RES>
    ) {
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
    private buildReqParam(req: any): REQ {

        let query = req.query || {};
        let path = req.params || {};
        let body = req.body || {};

        let param: Required<HttpParam> = {
            body, path, query
        };
        if (this.meta.pipe && this.meta.pipe.fromHttp) {
            return this.meta.pipe.fromHttp(param)
        }

        if (this.method == 'get' || this.method == 'delete') {
            return query;
        }
        if (this.method == 'put' || this.method == 'post') {
            return body;
        }

        return path;
    }



    async response(actionResult: any, req: any, res: any) {

        let param: IFilterParam = {
            actionResult,
            expressRes: res,
            expressReq: req,
            handled: false,

            refilter: async (result) => {
                return await this.response(result, req, res);
            }
        }

        let responseFilters = this.module.getResponseFilters();

        if (responseFilters) {
            for (const filter of responseFilters) {
                try {
                    await filter.filter(param);
                } catch (error) {
                    this.module.log('error', "the filter cannot send response", { actionResult, filter })
                    throw error;
                }

                if (param.handled) {
                    return;
                }
            }
        }


        try {
            let err: any = actionResult;
            if (err instanceof Error) {

                res.status(500).json({
                    name: err.name,
                    message: err.message
                });
            } else {
                return res.json(actionResult);
            }


        } catch (error) {
            this.module.log('error', 'default json response error', { error: error.message });
        }

        throw new Error('not handled response filter');
    }

    action(req: any, res: any, next: any, errorHandle?: IErrorHandle) {

        this.doAction(req, res, next)
            .then(result => this.response(result, req, res))
            .catch(err => {
                if (errorHandle) {
                    let errRest = errorHandle(err);
                    return this.response(errRest, req, res)
                        .catch((respError) => {
                            this.module.log('error', "responise error. response error", { error: respError });
                            try { return res.end(); } catch (error) { }
                        });
                }
                return next(err);
            })
    }

    private async doAction(req: any, res: any, next: any) {
        let params = this.buildReqParam(req);

        if (this.meta.validation) {
            this.meta.validation(params);
        }
        let ctx: IContext = {
            req, res
        }
        if (this._validation) {
            await this._validation(params, ctx);
        }

        return await this._action(params, ctx);

    }
}
