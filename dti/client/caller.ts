import { METHOD } from "@napp/dti-core";

export interface DtiClientCaller {
    (path: string, method: METHOD, param: any): Promise<any>
}

