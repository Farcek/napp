import { $$ExeptionNames } from "./names";

export interface IException {

    name: string;
    message: string;
    stack?: string;

    toJson(): any;
    
}

export class Exception extends Error implements IException {

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, Exception.prototype);
        super.name = $$ExeptionNames.Exception;
    }

    toJson() {
        return {
            name: this.name,
            message: this.message
        }
    }

}