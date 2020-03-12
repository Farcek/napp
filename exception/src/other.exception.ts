import { Exception } from './exception';

export class NotSupportedException extends Exception {
    constructor(message: string) {
        super('notsupported', message);
    }
}