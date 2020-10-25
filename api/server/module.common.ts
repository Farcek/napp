import { IMiddleware, IResponseFilter, IErrorHandle } from "./common";
import { AHandler } from "./action";

export interface IModuleOption {
    logger?: (level: string, message: string, dta: object) => void;
    errorHandle?: IErrorHandle;
    befores?: IMiddleware[];

    responseFilters?: IResponseFilter[];

    actions?: AHandler<any, any>[];
}

export interface IModule {
    getResponseFilters(): IResponseFilter[];

    log(level: 'debug' | 'info' | 'warn' | 'error', message: string, dta: any): void;
}