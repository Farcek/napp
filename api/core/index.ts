export type METHOD = 'get' | 'post' | 'put' | 'delete';

export interface HttpParam {
    body?: any;
    path?: Record<string, string>;
    query?: Record<string, string>;
}

export interface IPipeHandler<REQ> {
    toHttp?: (param: REQ) => HttpParam;
    fromHttp?: (param: Required<HttpParam>) => REQ;
}

export interface AInterface<REQ, RES> {
    name: string;
    path?: string;

    url?: (param: REQ) => string;

    method?: METHOD;
    validation?: (param: REQ) => void;

    pipe?: IPipeHandler<REQ>;
}

export interface IBuilder<REQ, RES> {
    url: (url: (param: REQ) => string) => IBuilder<REQ, RES>;
    path: (path: string) => IBuilder<REQ, RES>;
    method: (method: METHOD) => IBuilder<REQ, RES>;
    validation: (handle: (param: REQ) => void) => IBuilder<REQ, RES>;

    pipeToHttp: (handle: (param: REQ) => HttpParam) => IBuilder<REQ, RES>;
    pipeFromHttp: (handle: (param: Required<HttpParam>) => REQ) => IBuilder<REQ, RES>;

    factory: () => AInterface<REQ, RES>;
}
export function AActionFactory<REQ, RES>(name: string, path?: string): IBuilder<REQ, RES> {
    let m: AInterface<REQ, RES> = {
        name, path
    };
    let builder: IBuilder<REQ, RES> = {

        url: (url: (param: REQ) => string) => {
            m.url = url;
            return builder;
        },
        path: (path: string) => {
            m.path = path;
            return builder;
        },
        method: (method: METHOD) => {
            m.method = method;
            return builder;
        },
        validation: (handle: (param: REQ) => void) => {
            m.validation = handle;
            return builder;
        },

        pipeToHttp: (handle: (param: REQ) => HttpParam) => {
            let pipe = m.pipe || (m.pipe = {});
            pipe.toHttp = handle;
            return builder;
        },
        pipeFromHttp: (handle: (param: Required<HttpParam>) => REQ) => {
            let pipe = m.pipe || (m.pipe = {});
            pipe.fromHttp = handle;
            return builder;
        },

        factory: () => m

    }

    return builder;
}