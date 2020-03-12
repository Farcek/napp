import { Exception } from './exception';


export class NotFoundException extends Exception {
    constructor(message: string) {
        super('notfound', message);
        this.setDataValue('status', 404);
    }
}
