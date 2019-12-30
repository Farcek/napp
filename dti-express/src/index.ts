import { RestAPI } from "@napp/dti";
export interface IMiddleware {
    (req: any, res: any, next: any): void
}
export class ServerHandle<RQ, RS>{
    constructor(
        private api: RestAPI<RQ, RS>,
        private router: any
    ) {

    }


    private buildPath() {
        return this.api.path || ('/' + this.api.name);
    }

    private buildRQParam(req: any): RQ {
        if (this.api.method == 'GET') {
            return req.query || {}
        } else {
            return req.body || {}
        }
    }

    private _befores?: IMiddleware[];
    befores(... befores: IMiddleware[]) {
        this._befores = befores;
        return this;
    }

    action(handle: (rqParam: RQ,req:any) => Promise<RS>) {

        let path = this.buildPath();

        this.expAction(path, (req: any, res: any, next: any) => {
            let rqParam = this.buildRQParam(req);
            Promise.resolve(handle(rqParam, req))
                .then(r => res.json(r))
                .catch(err => next(err))
        });
    }

    private expAction(path: string, mid: IMiddleware): void {
        let bef = this._befores || [];
        if (this.api.method == 'GET') {
            console.log('attacg', 'get', path, mid);
            return this.router.get(path, bef, (req: any, res: any, next: any) => mid(req, res, next));
        } else if (this.api.method == 'POST') {
            return this.router.post(path,bef, (req: any, res: any, next: any) => mid(req, res, next));
        }

        throw new Error(`not supported Method. '${this.api.method}'`)
    }
}

export class ExpressService {
    constructor(private router: any) {

    }
    factory<RQ, RS>(api: RestAPI<RQ, RS>) {
        return new ServerHandle<RQ, RS>(api, this.router);
    }
}

