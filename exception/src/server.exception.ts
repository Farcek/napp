import { Exception } from './exception';
import { IHttpException } from './exception.http';

import { $$ExeptionNames } from './names';

export class ServerException extends Exception implements IHttpException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ServerException.prototype);
    super.name = $$ExeptionNames.NotFound;
  }

  status = 501;
  
}