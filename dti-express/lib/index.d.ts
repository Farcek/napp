import { RestAPI } from "@napp/dti";
export declare class ServerHandle<RQ, RS> {
    private Cls;
    constructor(Cls: RestAPI<RQ, RS>);
    action(handle: (rq: RQ) => Promise<RS>): void;
}
export declare function factory<RQ, RS>(Cls: RestAPI<RQ, RS>): ServerHandle<RQ, RS>;
