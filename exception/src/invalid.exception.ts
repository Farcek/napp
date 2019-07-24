import { IHttpException } from './exception.http';
import { Exception } from './exception';
import { $$ExeptionNames } from './names';

export class InvalidMessageException extends Exception implements IHttpException {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidMessageException.prototype);
        super.name = $$ExeptionNames.InvalidMessage;
    }
    status = 400;
}

export interface IInvalidProperties {
    [key: string]: string[];
}
export class InvalidPropertiesException extends Exception implements IHttpException {

    private properties: IInvalidProperties;
    constructor(message?: string, properties?: IInvalidProperties) {
        super(message || 'Invalid properties');
        Object.setPrototypeOf(this, InvalidPropertiesException.prototype);
        super.name = $$ExeptionNames.InvalidProperties;
        this.properties = properties || {};
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

    status = 400;

    toJson() {
        return {
            name: this.name,
            message: this.message,
            properties: this.properties
        };
    }





}