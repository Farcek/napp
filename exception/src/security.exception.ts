import { Exception } from './exception';


export class AuthenticationException extends Exception {
  constructor(message?: string) {
    super('authentication', message || 'requared authentication');
  }
}

export class AuthorizationException extends Exception {
  
  constructor(message: string ) {
    super('authorization', message);
  }
}