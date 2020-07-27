import { IMiddleware, IValidation, IAction } from "./common";

export interface OAPIHandler<REQ, RES> {
    befores?: IMiddleware[];
    validation?: IValidation<REQ>;
    action: IAction<REQ, RES>;
}