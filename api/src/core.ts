export type METHOD = 'get' | 'post' | 'put' | 'del';

export interface IRequestParam<BParam, PParam, QParam> {
    body?: BParam;
    path?: PParam;
    query?: QParam;
}


export interface IHandleInstance {

    str(): string;
    num(): number;
    date(): Date;
    bool(): boolean;
}
export interface IParamHandle<K extends keyof any> {
    (name: K): IHandleInstance
}
export interface IHasHandle<K extends keyof any> {
    (name: K): boolean
}

export interface IRequest2param<REQPARAM, PARAM> {
    req: REQPARAM;
    handle: IParamHandle<keyof PARAM>;
    has: IHasHandle<keyof PARAM>;
}

export interface IParamPipe<PARAM, REQPARAM> {
    param2request?: (param: PARAM) => REQPARAM;
    request2param?: (args: IRequest2param<REQPARAM, PARAM>) => PARAM;
}

export interface AInterface<RES, BParam = {}, PParam = {}, QParam = {}> {
    name: string;
    path?: string;

    url?: (param: IRequestParam<BParam, PParam, QParam>) => string;

    method?: METHOD;
    validation?: (param: Required<IRequestParam<BParam, PParam, QParam>>) => void;

    pipe?: {
        query?: IParamPipe<QParam, Record<keyof QParam, string>>,
        path?: IParamPipe<PParam, Record<keyof PParam, string>>,
        body?: IParamPipe<BParam, Readonly<BParam>>,
    }

}