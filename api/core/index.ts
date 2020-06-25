import { url } from "inspector";

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

export function AActionFactory<REQ, RES>(name: string, path?: string) {
    let m: AInterface<REQ, RES> = {
        name, path
    };
    let builder = {

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