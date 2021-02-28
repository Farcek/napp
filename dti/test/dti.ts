import { IClientAdapter, IServerAdapter, IOrder as BaseOrder, OrderType , IPager } from "@napp/dti-core/index";


export namespace Test01Dti {

    export interface IOrder extends BaseOrder {
        name?: OrderType;
        start?: OrderType;
        feedback?: OrderType;
    }

    export interface IFilter {
        name?: string;
    }


    export interface Requ {
        category: string;
        filter?: IFilter;
        order?: IOrder;
        pager?: IPager
    }


    export interface IItem {
        id: string;
        name: string;
        image: string;
        star: number;
        feedback: number;
    }

    export interface Resu {
        category:string;
        total: number;
        items: Array<IItem>;
    }

    export const path = '/t02-list';

    export function client(adp: IClientAdapter) {
        return adp
            .get<Requ, Resu>(path)
            .valid((param) => {
                if (!param.category) {
                    throw new Error('not found category by client')
                }
            })
            .factory()
            ;
    }

    export function server(adp: IServerAdapter) {

        return adp
            .get<Requ, Resu>(path)
            .valid((param) => {
                if (!param.category) {
                    throw new Error('not found category by server')
                }
            })
            .factory()
    }

}