import { Dti } from "@napp/dti-core";
import { DtiResponse } from "./response";

interface IAction<RES, PQ, PB> {
    (param: { q: PQ, b: PB }, ctx: { req: any, res: any }): Promise<RES>
}
interface IMiddleware {
    (req: any, res: any, next: any): void
}
interface QParser<T> {
    (req: any): T
}
export interface Logger {
    (level: string, message: string): void
}
export class ServerInstance<RES, PQ, PB> {
    beforeFuncs?: Array<IMiddleware>;
    actionFunc?: IAction<RES, PQ, PB>;
    constructor(private meta: Dti<RES, PQ, PB>) {

    }
    get name() {
        return this.meta.name;
    }
    get method() {
        return this.meta.method;
    }
    get path() {
        return this.meta.path;
    }
    get queryMode() {
        return this.meta.queryMode;
    }
    get bodyMode() {
        return this.meta.bodyMode;
    }
    check(q: PQ, b: PB) {
        this.meta.checkQ(q);
        this.meta.checkB(b);

    }
    before(funcs: Array<IMiddleware>) {
        this.beforeFuncs = funcs;
        return this;
    }
    handle(action: IAction<RES, PQ, PB>) {
        this.actionFunc = action;
        return this;
    }
}


export class ServerAdapter {
    actions: ServerInstance<any, any, any>[] = [];
    private logger: Logger;
    constructor(logger: Logger) {
        this.logger = logger;
    }
    register<RES, PQ, PB>(...act: ServerInstance<RES, PQ, PB>[]) {
        this.actions.push(...act);
        return this
    }

    private bodyParser?: (bodyMode: string) => IMiddleware;
    installBodyParser(parser: (bodyMode: string) => IMiddleware) {
        this.bodyParser = parser;
        return this;
    }
    private queryParser?: (queryMode: string) => QParser<any>;
    installQueryParser(parser: (queryMode: string) => QParser<any>) {
        this.queryParser = parser;
        return this;
    }

    static dti<RES, PQ, PB>(meta: Dti<RES, PQ, PB>) {
        return new ServerInstance<RES, PQ, PB>(meta);
    }

    private qParam(it: ServerInstance<any, any, any>, req: any) {
        if (this.queryParser) {
            let parser = this.queryParser(it.queryMode);
            if (parser) {
                let q = parser(req);
                return q;
            }
        }

        return req.query;
    }

    private callAction(it: ServerInstance<any, any, any>, req: any, res: any, next: any) {
        try {
            if (it.actionFunc) {
                let q = this.qParam(it, req);
                let b = req.body;
                it.check(q || {}, b || {});
                return it.actionFunc({ q, b }, { req, res })
                    .then(rsu => {
                        if (rsu instanceof DtiResponse) {
                            if (rsu.handle) {
                                return rsu.handle(res);
                            }
                            return res.end();
                        }
                        return res.json(rsu);
                    })
                    .catch(err => next(err));
            }
            throw new Error('not found action handle')
        } catch (error) {
            return next(error)
        }
    }

    private getBodyParser(it: ServerInstance<any, any, any>) {
        if (this.bodyParser) {
            let p = this.bodyParser(it.bodyMode);
            if (p) {
                return [p];
            }
        }
        return [];
    }

    setup<R>(route: R): R {
        let _route: any = route;

        for (let it of this.actions) {
            let befores = it.beforeFuncs || [];
            if (it.method === 'get') {
                _route.get(it.path, [...befores, (req: any, res: any, next: any) => {
                    this.callAction(it, req, res, next);
                }]);

            } else if (it.method === 'post') {
                let bodyparser = this.getBodyParser(it);
                if (bodyparser.length === 0) {
                    this.logger('warn', `not found body parser. name="${it.name}"; bodyMode="${it.bodyMode}"`)
                }
                _route.post(it.path, [...bodyparser, ...befores, (req: any, res: any, next: any) => {
                    this.callAction(it, req, res, next);
                }]);

            } else {
                this.logger('warn', `not supored method. "${it.method}"`)
            }
            this.logger('info', `[${it.method}] ${it.path}`)
        }

        // for (let it of this.routes) {
        //     let { name } = it(_route);
        //     this.logger('info', `register native route "${name}"`)
        // }

        return route;
    }
}
