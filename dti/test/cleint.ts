import { DtiClientAdapter } from "@napp/dti-client";
import { Test01Dti } from "./dti";
import { fetch } from "cross-fetch";

export class APIError extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = name;
    }
}


const baseUrl = '';
const adp = new DtiClientAdapter({
    caller: async (meta, { q, b }) => {

        let url = baseUrl + meta.path;
        if (q) {
            url = url + '?p=' + encodeURIComponent(JSON.stringify(q))
        }

        let resp = await fetch(url, {

            method: meta.method,

            headers: {
                "Content-Type": "application/json"
            },
            body: (meta.method == 'post') ? JSON.stringify(b || {}) : undefined
        });

        if (resp) {
            let respTxt = await resp.text();

            if (resp.ok) {
                try {
                    let resu = JSON.parse(respTxt || '{}');
                    return resu;
                } catch (error) {
                    throw new APIError("InvalidJSON", respTxt);
                }
            }

            if (respTxt) {
                try {
                    let error = JSON.parse(respTxt);
                    if (error && 'name' in error && 'message' in error) {
                        throw new APIError(error.name, error.message);
                    }
                    if (error && 'message' in error) {
                        if (resp.statusText) {
                            throw new APIError(resp.statusText, error.message);
                        }
                        throw new APIError('Response status ' + resp.status, error.message);
                    }
                } catch (error) { }

                if (resp.statusText) {
                    throw new APIError(resp.statusText, '' + respTxt);
                }

                throw new APIError('Response status ' + resp.status, '' + respTxt);
            }

            if (resp.statusText) {
                if (resp.status >= 500) {
                    throw new APIError('ServerError', '' + resp.statusText);
                }

                if (resp.status <= 499) {
                    throw new APIError('ApplicationError', '' + resp.statusText);
                }
            }

            if (resp.status >= 500) {
                throw new APIError('ServerError', 'Response status ' + resp.status);
            }

            if (resp.status <= 499) {
                throw new APIError('ApplicationError', 'Response status ' + resp.status);
            }

        }

        console.error(resp);
        throw new APIError('NetworkError', '!!!!!!!!! error logic !!!!!!!!!!');

        
    }
});


async function a() {
    let resp = await adp.dti(Test01Dti.meta).call({ q : {id : '0'}, b : {age : 5, name: "test"} });

    
    console.log(resp.flag)
    
    console.log(resp.message)
    console.log(resp)
}