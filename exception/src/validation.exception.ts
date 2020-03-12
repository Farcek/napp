
import { Exception } from './exception';




export class ValidationException extends Exception {
    constructor(message: string) {
        super('validation', message);
        this.setDataValue('status', 400);
    }
}

export interface IInvalidProperties {
    [key: string]: string[];
}
export class ValidationFormException extends Exception {


    constructor(message?: string, properties?: IInvalidProperties) {
        super('validation-from', message || 'Invalid properties');
        this.setDataValue('status', 400);
        this.data['properties'] = properties || {};
    }

    get properties() {
        return (this.data['properties'] || (this.data['properties'] = {})) as IInvalidProperties
    }


    addPropertyMessage(property: string, message: string) {
        if (property in this.properties) {
            this.properties[property].push(message);
        } else {
            this.properties[property] = [message];
        }
        return this;
    }

    hasProperty(name: string) {
        return name in this.properties;
    }

    getPropertyMessages(name: string) {
        if (name in this.properties) {
            return this.properties[name];
        }
        return [];
    }

    map<T>(handle: (property: string, messages: string[]) => T) {
        return Object.keys(this.properties)
            .map((property) => handle(property, this.properties[property]));
    }

    mapPropery<T>(property: string, handle: (message: string) => T) {
        if (property in this.properties) {
            return this.properties[property].map((message) => handle(message))
        }
        return [];
    }





}