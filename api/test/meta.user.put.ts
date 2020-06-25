
import { AInterface } from '@napp/api-core'
export namespace metaUserPut {
    export interface QParam {
        page: number;
        sort_field: string;
        sort_type: 'asc' | 'desc';
    }

    export enum OrderMode {
        A = 1,
        B = 2,
    }

    export interface PParam {
        customer: number;
        order: string;
        mode: OrderMode;
    }

    export interface BParam {
        name: string;
        age: number;
    }

    export interface ReqParam {
        q: QParam
        b: BParam

        p: PParam
    }

    export interface Resp {
        body: BParam
        path: PParam

        query: QParam
    }

    export const meta: AInterface<ReqParam, Resp> = {
        name: 'user.put',
        path: '/user.put/:customer/:order/:mode',
        url: ({ p: path, q: query }) => `/user.put/${path?.customer}/${path?.order}/${path?.mode}?page=${query?.page}&sort_field=${query?.sort_field}&sort_type=${query?.sort_type}`,
        method: 'put',
        validation: async ({ b: body }) => {
            if (!body.name) {
                throw new Error('requre name')
            }
        },

        pipe: {
            fromHttp: ({ body, path, query }) => {
                let b: BParam = body;
                let p: PParam = {
                    customer: parseInt(path.customer),
                    mode: parseInt(path.mode),
                    order: path.order
                };
                let q: QParam = {
                    page: parseInt(query.page),
                    sort_field: query.sort_field,
                    sort_type: query.sort_type == 'asc' ? 'asc' : 'desc'
                };
                return { b, p, q }
            },
            toHttp: ({ p,q,b }) => {
                return { 
                    body : b,
                    path : {
                        customer: `` + p.customer,
                        mode: `` + p.mode,
                        order: p.order
                    },
                    query : {
                        page:''+q.page,
                        sort_field:''+q.sort_field,
                        sort_type:''+q.sort_type,
                    }
                 }
            }
        }
    }
}