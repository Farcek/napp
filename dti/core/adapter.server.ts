export interface IMiddleware {
    (req: any, res: any, next: any): void;
}

export interface IAction<REQ, RES> {
    (param: REQ, ctx: { req: any, res: any }): Promise<RES>;
}


export interface IServerMethod<REQ, RES> {
    before: (befores: Array<IMiddleware>) => IServerMethod<REQ, RES>;
    handle: (action: IAction<REQ, RES>) => IServerMethod<REQ, RES>;
}

export interface IServerBuilder<REQ, RES> {
    valid: (handle: (param: REQ) => void) => IServerBuilder<REQ, RES>;

    factory: () => IServerMethod<REQ, RES>;
}
export interface IServerAdapter {
    get: <REQ, RES>(path: string) => IServerBuilder<REQ, RES>;
    post: <REQ, RES>(path: string) => IServerBuilder<REQ, RES>;
    put: <REQ, RES>(path: string) => IServerBuilder<REQ, RES>;
    patch: <REQ, RES>(path: string) => IServerBuilder<REQ, RES>;
    delete: <REQ, RES>(path: string) => IServerBuilder<REQ, RES>;
}