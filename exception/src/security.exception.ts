import { Exception } from './exception';


export class AuthenticationException extends Exception {
  constructor(message?: string) {
    super('authentication', message || 'requared authentication');
    this.setDataValue('status', 401);
  }
}
export class AuthorizationException extends Exception {
  constructor(requaredRoles: string | string[]) {
    super('authorization', `requared role: "${Array.isArray(requaredRoles) ? requaredRoles.join(', ') : requaredRoles}"`);
    this.setDataValue('status', 401);
    this.setDataValue('requaredRoles', Array.isArray(requaredRoles) ? requaredRoles : [requaredRoles]);
  }
}