import { IMessageError } from "./message.error";
export interface IPropertiesError extends IMessageError {
    properties?: {
        [property: string]: string[];
    };
}
export declare class PropertiesError implements IPropertiesError {
    message: string;
    properties: {
        [property: string]: string[];
    };
    constructor(message: string);
    addPropertyMessage(property: string, message: string): void;
    map<T>(handle: (property: string, messages: string[]) => T): T[];
    mapPropery<T>(property: string, handle: (message: string) => T): T[];
}
