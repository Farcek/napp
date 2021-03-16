import { IServerAdapter, IServerBuilder, IServerMethod, METHOD, IMiddleware, IAction, IParamParser } from "@napp/dti-core";
import { DTIResponse } from "./response";

class ServerMethod<REQ, RES> implements IServerMethod<REQ, RES> {

    beforeFuncs?: Array<IMiddleware>;
    actionFunc?: IAction<REQ, RES>;
    paramParser?: IParamParser<REQ>;
    constructor(
        public method: METHOD,
        public path: string,
        public validateHandle: ((param: REQ) => void) | undefined,
        public paramParseHandle: IParamParser<REQ> | undefined,

        actions: Array<ServerMethod<any, any>>
    ) {
        actions.push(this);
    }

    before(funcs: Array<IMiddleware>) {
        this.beforeFuncs = funcs;
        return this;
    }
    handle(action: IAction<REQ, RES>) {
        this.actionFunc = action;
        return this;
    }
}

class ServerBuilder<REQ, RES> implements IServerBuilder<REQ, RES> {
    validateHandle?: (param: REQ) => void;
    paramParserHandle?: IParamParser<REQ>;
    constructor(
        private method: METHOD,
        private path: string,

        private actions: Array<ServerMethod<any, any>>

    ) {

    }
    paramParser(handle: IParamParser<REQ>) {
        this.paramParserHandle = handle;
        return this;
    }
    valid(handle: (param: REQ) => void) {
        this.validateHandle = handle;
        return this;
    };
    factory() {
        return new ServerMethod<REQ, RES>(
            this.method,
            this.path,
            this.validateHandle,
            this.paramParserHandle,
            this.actions)
    };
}

class ServerAdapter implements IServerAdapter {

    constructor(private actions: Array<ServerMethod<any, any>>) {

    }

    get<REQ, RES>(path: string) {
        return new ServerBuilder<REQ, RES>('get', path, this.actions);
    }

    post<REQ, RES>(path: string) {
        return new ServerBuilder<REQ, RES>('post', path, this.actions);
    }
    put<REQ, RES>(path: string) {
        return new ServerBuilder<REQ, RES>('put', path, this.actions);
    }
    patch<REQ, RES>(path: string) {
        return new ServerBuilder<REQ, RES>('patch', path, this.actions);
    }

    delete<REQ, RES>(path: string) {
        return new ServerBuilder<REQ, RES>('delete', path, this.actions);
    }


}

export interface Logger {
    (level: string, message: string): void
}
export interface IRouteFactory {
    (route: any): { name: string }
}
export class ServerAdapterFactory {
    private actions: Array<ServerMethod<any, any>> = [];
    private routes: Array<IRouteFactory> = [];
    public adapter = new ServerAdapter(this.actions);

    private bodyParserByJson?: IMiddleware;

    private queryParamParser?: (req: any) => any;
    private bodyParamParser?: (req: any) => any;

    private logger: Logger;
    constructor(logger: Logger) {
        this.logger = logger;
    }

    setBodyParserByJson(parser: IMiddleware) {
        this.bodyParserByJson = parser;
        return this;
    }

    setQueryParamParser(parser: (req: any) => any) {
        this.queryParamParser = parser;
        return this;
    }
    setBodyParamParser(parser: (req: any) => any) {
        this.bodyParamParser = parser;
        return this;
    }

    addNativeRoute(factory: IRouteFactory) {
        this.routes.push(factory)
        return this;
    }

    private paramsByGet(req: any, sm: ServerMethod<any, any>) {
        if (sm.paramParseHandle) {
            return sm.paramParseHandle(req);
        }
        if (this.queryParamParser) {
            return this.queryParamParser(req);
        }
        return req.query || {}
    }

    private paramsByPost(req: any, sm: ServerMethod<any, any>) {
        if (sm.paramParseHandle) {
            return sm.paramParseHandle(req);
        }
        if (this.bodyParamParser) {
            return this.bodyParamParser(req);
        }
        return req.body || {}
    }

    private callAction(it: ServerMethod<any, any>, param: any, req: any, res: any, next: any) {
        if (it.validateHandle) {
            try {
                it.validateHandle(param)
            } catch (error) {
                return next(error);
            }
        }
        if (it.actionFunc) {
            return it.actionFunc(param || {}, { req, res })
                .then(rsu => {
                    if (rsu instanceof DTIResponse) {
                        if (rsu.handle) {
                            return rsu.handle(res);
                        }
                        return;
                    }
                    return res.json(rsu);
                })
                .catch(err => next(err));
        }

        return next(new Error('not found action handle'))
    }

    setup<R>(route: R): R {
        let _route: any = route;

        for (let it of this.actions) {
            let befores = it.beforeFuncs || [];
            if (it.method == 'get') {
                _route.get(it.path, [...befores, (req: any, res: any, next: any) => {
                    let param = this.paramsByGet(req, it);
                    this.callAction(it, param, req, res, next);
                }])
            } else if (it.method == 'delete') {
                _route.delete(it.path, [...befores, (req: any, res: any, next: any) => {
                    let param = this.paramsByGet(req, it);
                    this.callAction(it, param, req, res, next);
                }])
            } else if (it.method == 'post') {
                let jsonparser = this.bodyParserByJson ? [this.bodyParserByJson] : [];
                _route.post(it.path, [...jsonparser, ...befores, (req: any, res: any, next: any) => {
                    let param = this.paramsByPost(req, it);
                    this.callAction(it, param, req, res, next);
                }])
            } else if (it.method == 'put') {
                let jsonparser = this.bodyParserByJson ? [this.bodyParserByJson] : [];
                _route.put(it.path, [...jsonparser, ...befores, (req: any, res: any, next: any) => {
                    let param = this.paramsByPost(req, it);
                    this.callAction(it, param, req, res, next);
                }])
            } else if (it.method == 'patch') {
                let jsonparser = this.bodyParserByJson ? [this.bodyParserByJson] : [];
                _route.patch(it.path, [...jsonparser, ...befores, (req: any, res: any, next: any) => {
                    let param = this.paramsByPost(req, it);
                    this.callAction(it, param, req, res, next);
                }])
            } else {
                this.logger('warn', `not supored method. "${it.method}"`)
            }
            this.logger('info', `[${it.method}] ${it.path}`)
        }

        for (let it of this.routes) {
            let { name } = it(_route);
            this.logger('info', `register native route "${name}"`)
        }

        return route;
    }

}
