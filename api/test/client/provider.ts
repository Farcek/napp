import { DtiProvider, DtiModule } from "@napp/api-client";
import { METHOD } from "@napp/api-core";
import { fetch, Request } from 'cross-fetch';

const testProvider: DtiProvider = async (path: string, method: METHOD, body: any) => {

    let url = `http://localhost:3000/api-test${path}`;

    // console.log('path',path)
    // console.log('url',url)


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

    let bodyStr = await resp.text();

    if (bodyStr) {
        let err: any = '';
        try {
            err = JSON.parse(bodyStr);
        } catch (error) {
        }
        if (err) {
            throw err;
        }
        throw new Error(bodyStr);
    }

    throw new Error(resp.statusText);

};

export const clientModule = new DtiModule('http://localhost:3000/api-test', testProvider);

