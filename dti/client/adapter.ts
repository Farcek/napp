import { Dti } from "@napp/dti-core";


export interface ODtiClientAdapter {
    caller: <RES, PQ, PB>(meta: Dti<RES, PQ, PB>, param: { q: PQ, b: PB }) => Promise<RES>
}
export class DtiClientAdapter {
    constructor(private opt: ODtiClientAdapter) {

    }

    dti<RES, PQ, PB>(meta: Dti<RES, PQ, PB>) {
        return new DtiClient<RES, PQ, PB>(async (param) => {
            return await this.opt.caller(meta, param)
        }, meta);
    }    
}

export interface ODtiClient {
    adp: DtiClientAdapter
}
export class DtiClient<RES, PQ, PB> {
    constructor(private caller: (param: { q: PQ, b: PB }) => Promise<RES>, private meta: Dti<RES, PQ, PB>) {

    }

    check(param: { q: PQ, b: PB }) {
        this.meta.checkQ(param.q);
        this.meta.checkB(param.b);
    }

    async call(param: { q: PQ, b: PB }, checkIgnore?: boolean) {
        let c = checkIgnore === true ? false : true;
        if (c) {
            this.check(param);
        }

        return await this.caller(param);
    }
}
