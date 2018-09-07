import { IMessageError } from "./message.error";

export interface IPropertiesError extends IMessageError {
    properties?: { [key: string]: string[] };
}

