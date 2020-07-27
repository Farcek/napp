import { IMiddleware, IResponseFilter, IErrorHandle } from "./common";

export interface IModuleOption {
    logger?: (level: string, message: string, dta: object) => void;
    errorHandle?: IErrorHandle;
    befores?: IMiddleware[];

    responseFilters?: IResponseFilter[];
}

export interface IModule {
    getResponseFilters(): IResponseFilter[];

    log(level: 'debug' | 'info' | 'warn' | 'error', message: string, dta: any): void;
}