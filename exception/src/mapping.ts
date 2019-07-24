import { Exception, IException } from "./exception";
import { NotFoundException } from "./notfound.exception";
import { $$ExeptionNames } from "./names";
import { InvalidMessageException, InvalidPropertiesException } from "./invalid.exception";
import { AuthenticationException, AuthorizationException } from "./security.exception";
import { ServerException } from "./server.exception";

export const $$ExeptionMaping: {
    [name: string]: { (obj: any): IException }
}
    = {
    [$$ExeptionNames.Exception]: (data) => new Exception(data.message),
    [$$ExeptionNames.InvalidMessage]: (data) => new InvalidMessageException(data.message),
    [$$ExeptionNames.InvalidProperties]: (data) => new InvalidPropertiesException(data.message, data.properties),
    [$$ExeptionNames.NotFound]: (data) => new NotFoundException(data.message),
    [$$ExeptionNames.Authentication]: (data) => new AuthenticationException(data.message),
    [$$ExeptionNames.Authorization]: (data) => new AuthorizationException(data.message),
    [$$ExeptionNames.Server]: (data) => new ServerException(data.message),
};

export function registerException<T extends IException>(name: string, factory: (data: any) => T) {

    if (name in $$ExeptionMaping) {
        throw new Exception(`"${name}" exception already registered`);
    }
    $$ExeptionMaping[name] = factory;
}

export function convertException(err: any) {
    if (err instanceof Exception) {
        return err;
    }

    if (err instanceof Error) {
        let e = new Exception(err.message);
        e.name = err.name;
        e.stack = err.stack;
        return e;
    }

    if (err && err.name && err.message) {
        let names = Object.keys($$ExeptionMaping);
        for (let name of names) {
            if (err.name == name) {
                let factory = $$ExeptionMaping[name];

                let e = factory(err);
                if (err.stack) {
                    e.stack = err.stack;
                }
                return e;
            }
        }
    }

    if (err && err.message) {
        let e = new Exception(err.message);

        if (err && err.stack) {
            e.stack = err.stack;
        }

        return e;
    }

    if (typeof err === 'string' || err instanceof String) {
        return new Exception('' + err);
    }

    return new Exception("unknown exception");
}