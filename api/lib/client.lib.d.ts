import { AInterface, METHOD, IRequestParam } from './core';
export interface DtiProvider {
    (path: string, method: METHOD, body: any): Promise<any>;
}
export interface DtiInstance<RES> {
    call: () => Promise<RES>;
    validate: () => void;
}
export interface DtiCalling<RES, BParam, PParam, QParam> {
    (param: IRequestParam<BParam, PParam, QParam>): DtiInstance<RES>;
}
export declare class DtiModule {
    private provider;
    constructor(provider: DtiProvider);
    private url;
    factory<RES, BParam, PParam, QParam>(meta: AInterface<RES, BParam, PParam, QParam>): DtiCalling<RES, BParam, PParam, QParam>;
}
//# sourceMappingURL=client.lib.d.ts.map