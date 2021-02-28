export interface IClientMethod<REQ, RES> {
    call : (param: REQ)=> Promise<RES>;
}

export interface IClientBuilder<REQ, RES> {
    valid: (handle: (param: REQ) => void) => IClientBuilder<REQ, RES>

    factory: () => IClientMethod<REQ, RES>;
}
export interface IClientAdapter {
    get: <REQ, RES>(path: string) => IClientBuilder<REQ, RES>;
    post: <REQ, RES>(path: string) => IClientBuilder<REQ, RES>;
    put: <REQ, RES>(path: string) => IClientBuilder<REQ, RES>;
    patch: <REQ, RES>(path: string) => IClientBuilder<REQ, RES>;
    delete: <REQ, RES>(path: string) => IClientBuilder<REQ, RES>
}