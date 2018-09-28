export interface IMessageError {
    message?: string;
}
export declare class MessageError implements IMessageError {
    message: string;
    constructor(message: string);
}
