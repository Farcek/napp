
import { AInterface } from 'src/core'
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


    export interface Resp {
        body: BParam
        path: PParam

        query: QParam
    }

    export const meta: AInterface<Resp, BParam, PParam, QParam> = {
        name: 'user.put',
        path: '/user.put/:customer/:order/:mode',
        url: ({ path, query }) => `/user.put/${path?.customer}/${path?.order}/${path?.mode}?page=${query?.page}&sort_field=${query?.sort_field}&sort_type=${query?.sort_type}`,
        method: 'put',
        validation: async ({ body }) => {
            if (!(body?.name)) {
                throw new Error('requre name')
            }
        },

        pipe: {
            query: {
                request2param: ({ req: qParam, handle }) => {

                    let i: number = handle('page').num()
                    return {
                        page: parseInt(qParam.page),
                        sort_field: qParam.sort_field,
                        sort_type: qParam.sort_type == 'asc' ? 'asc' : 'desc'
                    }
                }
            },
            path: {
                param2request: (p) => {
                    return {
                        customer: `` + p.customer,
                        mode: `` + p.mode,
                        order: p.order
                    }
                },
                request2param: ({ req: qParam }) => {

                    return {
                        customer: parseInt(qParam.customer),
                        mode: qParam.mode == '1' ? OrderMode.A : OrderMode.B,
                        order: qParam.order
                    }
                }
            },
            body: {
                param2request: (p) => {
                    return p
                }
            }
        }
    }
}