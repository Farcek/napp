import { DtiProvider, DtiModule } from "src/client.lib";
import { METHOD } from "src/core";
import { fetch, Request } from 'cross-fetch';

const testProvider: DtiProvider = async (path: string, method: METHOD, body: any) => {

    let url = `http://localhost:3000/api-test${path}`;


    let opt: RequestInit = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
    };

    if (method === 'post' || method === 'put') {
        opt.body = body ? JSON.stringify(body) : undefined;
    }

    let resp = await fetch(url, opt);

    if (resp.ok) {
        return await resp.json();
    }

    throw new Error(resp.statusText);

};

export const clientModule = new DtiModule(testProvider);

