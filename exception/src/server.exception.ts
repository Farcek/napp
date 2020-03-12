import { Exception } from './exception';


export class ServerException extends Exception {
  constructor(message: string ) {
    super('server', message);
    this.setDataValue('status', 501);
  }
}