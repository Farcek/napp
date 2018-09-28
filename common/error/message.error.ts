export interface IMessageError {
    message?: string;
}


export class MessageError implements IMessageError {

    public message: string;
    constructor(message: string) {
        this.message = message;
    }
}
