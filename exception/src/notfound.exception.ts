import { Exception } from './exception';
import { IHttpException } from './exception.http';

import { $$ExeptionNames } from './names';

export class NotFoundException extends Exception implements IHttpException {
    constructor(message: string) {

        super(message);
        Object.setPrototypeOf(this, NotFoundException.prototype);
        super.name = $$ExeptionNames.NotFound;
    }

    status = 404;
}