import { IException } from "./exception";
import { NotFoundException } from "./notfound.exception";
import { NotSupportedException } from "./other.exception";
import { AuthenticationException, AuthorizationException } from "./security.exception";
import { ServerException } from "./server.exception";
import { ValidationException } from "./validation.exception";

export function ExceptionParser(err: IException) {

    if (err.name === 'notfound') {
        return new NotFoundException(err.message);
    }

    if (err.name === 'notsupported') {
        return new NotSupportedException(err.message);
    }
    if (err.name === 'authentication') {
        return new AuthenticationException(err.message);
    }
    if (err.name === 'authorization') {
        return new AuthorizationException(err.message);
    }
    if (err.name === 'server') {
        return new ServerException(err.message);
    }
    if (err.name === 'validation') {
        return new ValidationException(err.message);
    }

    return false;
}