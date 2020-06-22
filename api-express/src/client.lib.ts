import { AInterface, METHOD, IRequestParam } from './core';
// import { compile } from 'path-to-regexp';



export interface DtiProvider {
    (path: string, method: METHOD, body: any): Promise<any>
}


export interface DtiInstance<RES> {
    call: () => Promise<RES>,
    validate: () => void,
}

export interface DtiCalling<RES, BParam, PParam, QParam> {
    (param: IRequestParam<BParam, PParam, QParam>): DtiInstance<RES>
}

export class DtiModule {
    constructor(
        private provider: DtiProvider
    ) {

    }


    private url<RES, BParam, PParam, QParam>(meta: AInterface<RES, BParam, PParam, QParam>, param: IRequestParam<BParam, PParam, QParam>) {

        if (meta.url) {
            return meta.url(param);
        }

        return meta.path || '/' + meta.name;
    }

    factory<RES, BParam, PParam, QParam>(meta: AInterface<RES, BParam, PParam, QParam>): DtiCalling<RES, BParam, PParam, QParam> {

        let mt = meta.method || 'get';

        return (param: IRequestParam<BParam, PParam, QParam>) => {
            return {
                call: async () => {
                    let url = this.url(meta, param);
                    return await this.provider(url, mt, param.body);
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