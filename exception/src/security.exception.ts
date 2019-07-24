import { IHttpException } from './exception.http';

import { $$ExeptionNames } from './names';
import { Exception } from './exception';


export class AuthenticationException extends Exception implements IHttpException {

  constructor(message?: string) {
    super(message || 'requared authentication');
    Object.setPrototypeOf(this, AuthenticationException.prototype);
    this.name = $$ExeptionNames.Authentication;
  }

  status = 401;
}

export class AuthorizationException extends Exception implements IHttpException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthenticationException.prototype);
    this.name = $$ExeptionNames.Authorization;
  }

  status = 401;
}