import { AHandler, AHandlerWrap } from "./action";
import { IModuleOption, IModule } from "./module.common";

export class AModule implements IModule {

    constructor(
        private name: string,
        private opt: IModuleOption
    ) { }

    private _handlers = new Map<string, AHandlerWrap<any, any>>();
    register(...handlers: AHandler<any, any>[]) {

        for (let h of handlers) {
            this._register(h);
        }

        return this;
    }

    private _register(handler: AHandler<any, any>) {

        let w = new AHandlerWrap(this, handler);

        if (this._handlers.has(w.name)) {
            throw new Error(`registered "${w.name}" the handler`);
        }

        this._handlers.set(w.name, w);

        return this;
    }

    getResponseFilters() {
        return this.opt.responseFilters || [];
    }

    log(level: 'debug' | 'info' | 'warn' | 'error', message: string, dta: any) {
        let { logger } = this.opt;
        if (logger) {
            logger(level, message, dta);
        }
    }

    setup(app: any) {
        this.log('info', 'setup.module', { name: this.name });

        this._handlers.forEach((wrap) => {
            this._setup(app, wrap);
        })

        return app;
    }




    private _setup(app: any, wrap: AHandlerWrap<any, any>) {

        let name = wrap.name;
        let path = wrap.path;
        let method = wrap.method;
        let errorHandle = this.opt.errorHandle;

        let moduleBefores = this.opt.befores || [];
        let actionBefores = wrap.getBefores();
        let befores = [...moduleBefores, ...actionBefores];

        if (method === 'get') {
            app.get(path, befores, (req: any, res: any, next: any) => wrap.action(req, res, next, errorHandle))
        } else if (method === 'post') {
            app.post(path, befores, (req: any, res: any, next: any) => wrap.action(req, res, next, errorHandle))
        } else if (method === 'delete') {
            app.delete(path, befores, (req: any, res: any, next: any) => wrap.action(req, res, next, errorHandle))
        } else if (method === 'put') {
            app.put(path, befores, (req: any, res: any, next: any) => wrap.action(req, res, next, errorHandle))
        } else {
            throw new Error("not suppoered method. handler = " + name);
        }

        this.log('info', 'setup.action', { name, method, path });
    }
}