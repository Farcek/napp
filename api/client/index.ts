import { AInterface, METHOD, HttpParam } from '@napp/api-core';
// import { compile } from 'path-to-regexp';


export interface DtiProvider {
    (path: string, method: METHOD, body: any): Promise<any>
}


export interface DtiInstance<RES> {
    call: () => Promise<RES>,
    validate: () => void,
}

export interface DtiCalling<REQ, RES> {
    (param: REQ): DtiInstance<RES>
}

export class DtiModule {
    constructor(
        private baseUrl: string,
        private provider: DtiProvider
    ) {

    }



    private getPUrl(urlPath: string, pParams: Record<string, string>) {

        let url = urlPath || '';
        for (let k in pParams) {
            url = url.replace('/:' + k, '/' + pParams[k]);
        }

        return url
    }

    private url<REQ, RES>(meta: AInterface<REQ, RES>, param: REQ, httpParam: HttpParam) {
        if (meta.url) {
            return meta.url(param);
        }

        if (meta.path) {

            let p = this.getPUrl(meta.path, httpParam.path || {});

            let q: string[] = [];


            let allParams = { ...(httpParam.query || {}) }
            for (let k in allParams) {
                let v = encodeURIComponent(allParams[k]);
                q.push(`${k}=${v}`);
            }

            if (q.length > 0) {
                return p + '?' + q.join('&');
            }
        }

        return meta.path || '/' + meta.name;
    }

    private pipeParam<REQ, RES>(meta: AInterface<REQ, RES>, param: REQ): HttpParam {

        if (meta.pipe && meta.pipe.toHttp) {
            return meta.pipe.toHttp(param);
        }

        let mt = meta.method || 'get';

        if (mt == 'get' || mt == 'delete') {
            return {
                body: undefined,
                path: {},
                query: (param as any)
            };
        }

        if (mt == 'put' || mt == 'post') {
            return {
                body: param,
                path: {},
                query: {}
            };
        }

        throw new Error("not suppored method");
    }



    factory<REQ, RES>(meta: AInterface<REQ, RES>): DtiCalling<REQ, RES> {

        let mt = meta.method || 'get';

        return (param: REQ) => {
            return {
                call: async () => {
                    let httpParam = this.pipeParam(meta, param);
                    let url = this.url(meta, param, httpParam);

                    if (url && url.startsWith("http://") && url.startsWith("https://") && url.startsWith("//")) {
                        return await this.provider(url, mt, httpParam.body);
                    }

                    return await this.provider(this.baseUrl + url, mt, httpParam.body);

                },
                validate: async () => {
                    if (meta.validation) {
                        meta.validation(param);
                    }
                }
            }
        }
    }

}