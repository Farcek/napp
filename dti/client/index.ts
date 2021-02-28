import { IClientAdapter, IClientBuilder, IClientMethod, METHOD } from "@napp/dti-core";


import { DtiClientCaller } from "./caller";


class ClientMethod<REQ, RES> implements IClientMethod<REQ, RES> {
    constructor(
        private caller: DtiClientCaller,
        private method: METHOD,
        private path: string,
        private validateHandle?: (param: REQ) => void
    ) {

    }
    async call(param: REQ) {
        if (this.validateHandle) {
            this.validateHandle(param);
        }

        return await this.caller(this.path, this.method, param) as RES;

        
    }

}
class ClientBuilder<REQ, RES> implements IClientBuilder<REQ, RES>{

    validateHandle?: (param: REQ) => void
    constructor(
        private caller: DtiClientCaller,
        private method: METHOD,
        private path: string
    ) {

    }
    valid(handle: (param: REQ) => void) {
        this.validateHandle = handle;
        return this;
    }
    factory() {

        return new ClientMethod<REQ, RES>(
            this.caller,
            this.method,
            this.path,
            this.validateHandle
        );
    }
}

export class DtiClientAdapter implements IClientAdapter {

    constructor(private caller: DtiClientCaller) {

    }

    get<REQ, RES>(path: string) {
        return new ClientBuilder<REQ, RES>(this.caller, 'get', path)
    };
    post<REQ, RES>(path: string) {
        return new ClientBuilder<REQ, RES>(this.caller, 'post', path)
    };
    put<REQ, RES>(path: string) {
        return new ClientBuilder<REQ, RES>(this.caller, 'put', path)
    };
    patch<REQ, RES>(path: string) {
        return new ClientBuilder<REQ, RES>(this.caller, 'patch', path)
    };
    delete<REQ, RES>(path: string) {
        return new ClientBuilder<REQ, RES>(this.caller, 'delete', path)
    };


}

export {
    DtiClientCaller
}