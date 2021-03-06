import { IServerAdapter, IServerBuilder, IServerMethod, METHOD, IMiddleware, IAction } from "@napp/dti-core";

class ServerMethod<REQ, RES> implements IServerMethod<REQ, RES> {

    beforeFuncs?: Array<IMiddleware>;
    actionFunc?: IAction<REQ, RES>;
    constructor(
        public method: METHOD,
        public path: string,
        public validateHandle: ((param: REQ) => void) | undefined,
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
    validateHandle?: (param: REQ) => void
    constructor(
        private method: METHOD,
        private path: string,

        private actions: Array<ServerMethod<any, any>>

    ) {

    }
    valid(handle: (param: REQ) => void) {
        this.validateHandle = handle;
        return this;
    };
    factory() {
        return new ServerMethod<REQ, RES>(this.method, this.path, this.validateHandle, this.actions)
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

export class ServerAdapterFactory {
    private actions: Array<ServerMethod<any, any>> = [];
    public adapter = new ServerAdapter(this.actions);
    private bodyParserByJson?: IMiddleware;

    private queryParamParser?: (req: any) => any;
    private bodyParamParser?: (req: any) => any;

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

    private paramsByGet(req: any) {
        if (this.queryParamParser) {
            return this.queryParamParser(req);
        }
        return req.query || {}
    }

    private paramsByPost(req: any) {
        if (this.bodyParamParser) {
            return this.bodyParamParser(req);
        }
        return req.body || {}
    }

    private callAction(it: ServerMethod<any, any>, param: any, req: any, res: any, next: any) {
        if(it.validateHandle) {
            try {
                it.validateHandle(param)    
            } catch (error) {
                return next(error);
            }
        }
        if (it.actionFunc) {
            return it.actionFunc(param || {}, { req, res })
                .then(rsu => {
                    res.json(rsu)
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
                    let param = this.paramsByGet(req);
                    this.callAction(it, param, req, res, next);
                }])
            } else if (it.method == 'delete') {
                _route.delete(it.path, [...befores, (req: any, res: any, next: any) => {
                    let param = this.paramsByGet(req);
                    this.callAction(it, param, req, res, next);
                }])
            } else if (it.method == 'post') {
                let jsonparser = this.bodyParserByJson ? [this.bodyParserByJson] : [];
                _route.post(it.path, [...jsonparser, ...befores, (req: any, res: any, next: any) => {
                    let param = this.paramsByPost(req);
                    this.callAction(it, param, req, res, next);
                }])
            } else if (it.method == 'put') {
                let jsonparser = this.bodyParserByJson ? [this.bodyParserByJson] : [];
                _route.put(it.path, [...jsonparser, ...befores, (req: any, res: any, next: any) => {
                    let param = this.paramsByPost(req);
                    this.callAction(it, param, req, res, next);
                }])
            } else if (it.method == 'patch') {
                let jsonparser = this.bodyParserByJson ? [this.bodyParserByJson] : [];
                _route.patch(it.path, [...jsonparser, ...befores, (req: any, res: any, next: any) => {
                    let param = this.paramsByPost(req);
                    this.callAction(it, param, req, res, next);
                }])
            }
        }

        return route;
    }

}
