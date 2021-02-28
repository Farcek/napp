import { DtiClientAdapter, DtiClientCaller } from "@napp/dti-client";
import { Test01Dti } from "./dti";
import { fetch } from "cross-fetch";

export class APIError extends Error {
    constructor(name: string, message: string) {
        super(message);
        this.name = name;
    }
}

function serialize(obj: any) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

const baseUrl = '';
const caller: DtiClientCaller = async (path, method, param) => {
    try {
        let url = (method == 'get' || method == 'delete')
            ? `${baseUrl}${path}?${serialize(param)}`
            : `${baseUrl}${path}`;
        let resp = await fetch(url, {

            method: method,

            headers: {
                "Content-Type": "application/json"
            },
            body: (method == 'post' || method == 'put' || method == 'patch') ? JSON.stringify(param || {}) : undefined
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

    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }

        if (error instanceof TypeError) {
            throw new APIError(`NetworkError`, error.message);
        }

        throw new APIError('NetworkError', error);
    }
}



const adp = new DtiClientAdapter(caller)


async function a() {
    let resp = await Test01Dti.client(adp).call({ category: '11' });
}