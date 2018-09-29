import { IMessageError } from "./message.error";

export interface IPropertiesError extends IMessageError {
    properties?: { [property: string]: string[] };
}

export class PropertiesError implements IPropertiesError {

    public message: string;
    public properties: { [property: string]: string[] } = {};
    constructor(message: string) {
        this.message = message;
    }

    addPropertyMessage(property: string, message: string) {
        let messages = this.properties[property] || (this.properties[property] = []);
        messages.push(message);
    }

    map<T>(handle: (property: string, messages: string[]) => T) {
        return Object.keys(this.properties)
            .map((property) => handle(property, this.properties[property]));
    }

    mapPropery<T>(property: string, handle: (message: string) => T) {
        if (property in this.properties) {
            return this.properties[property].map((message) => handle(message))
        }
        throw new ReferenceError(`not found property "${property}"`);
    }
}