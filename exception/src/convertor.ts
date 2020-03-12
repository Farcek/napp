import { Exception } from './exception';
import { NotFoundException } from './notfound.exception';
import { NotSupportedException } from './other.exception';
import { AuthenticationException, AuthorizationException } from './security.exception';
import { ServerException } from './server.exception';
import { ValidationException, ValidationFormException } from './validation.exception';


function resolveData(src: any, err: Exception) {
    if (src && src.data) {
        err.setData(src.data);
    }
    return err;
}
function resolveException(name: string, message: string) {
    if (name === 'notfound') {
        return new NotFoundException(message)
    }
    if (name === 'authentication') {
        return new AuthenticationException(message)
    }
    if (name === 'authorization') {
        return new AuthorizationException(message)
    }
    if (name === 'server') {
        return new ServerException(message)
    }
    if (name === 'validation') {
        return new ValidationException(message)
    }
    if (name === 'validation-from') {
        return new ValidationFormException(message)
    }
    return new Exception(name, message);
}
export function ExceptionConvert(err: any) {
    if (err instanceof Exception) {
        return err;
    }

    if (err instanceof Error) {
        if (err.name) {
            let e = new Exception(err.name, err.message);
            return resolveData(err, e);
        }
        let e = new NotSupportedException(err.message);
        return resolveData(err, e);
    }

    if (err && err.name && err.message) {
        let e = resolveException(err.name, err.message).setDataValue('error', err);
        return resolveData(err, e);
    }

    if (err && err.message) {
        let e = new NotSupportedException(err.message).setDataValue('error', err);
        return resolveData(err, e);
    }

    if (err && err.name) {
        let e = new Exception(err.name, 'no error message').setDataValue('error', err);
        return resolveData(err, e);
    }

    if (typeof err === 'string') {
        return new NotSupportedException(err);
    }


    return new NotSupportedException("no error message").setDataValue('error', err);
}

