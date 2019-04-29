import { ReflectClassmeta } from "./class";
import { Classtype } from "./common";

export enum DecoratorType {
    class = 2,
    property = 4,
    method = 8,
    argument = 16
}

export interface IDecoratorOption {
    decoratorType: DecoratorType;

    property?: { name: string }
    method?: { name: string, descriptor: TypedPropertyDescriptor<any> }
    argument?: { method: string, index: number }
}
export interface IDecoratorHandler<T> {
    /**
     * return true. push to attr 
     */
    (meta: ReflectClassmeta, decoratorOption: IDecoratorOption, option: T): void;
}



export function decoratorFactoryClass<T>(attrDta: T, key?: symbol | string, handler?: IDecoratorHandler<T>) {
    return (target: Function) => {
        let meta = ReflectClassmeta.Resolve(target as Classtype);
        if (handler) {
            handler(meta, { decoratorType: DecoratorType.class }, attrDta);
        }
        if (key) {
            meta.attrSetClass(key, attrDta);
        }
    }
}
export function decoratorFactoryProperty<T>(attrDta: T, key?: symbol | string, handler?: IDecoratorHandler<T>) {
    return (target: Object, propertyKey: string) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!meta.propertyHas(propertyKey)) {
            meta.propertyCreate(propertyKey);
        }
        if (handler) {
            handler(meta, { decoratorType: DecoratorType.property, property: { name: propertyKey } }, attrDta);
        }
        if (key) {
            meta.attrSetProperty(key, propertyKey, attrDta);
        }
    }
}

export function decoratorFactoryMethod<T>(attrDta: T, key?: symbol | string, handler?: IDecoratorHandler<T>) {
    return (target: Object, method: string, descriptor: TypedPropertyDescriptor<any>) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!meta.methodHas(method)) {
            meta.methodCreate(method);
        }
        if (handler) {
            handler(meta, { decoratorType: DecoratorType.method, method: { name: method, descriptor } }, attrDta);
        }
        if (key) {
            meta.attrSetMethod(key, method, attrDta);
        }
    }
}

export function decoratorFactoryArgument<T>(attrDta: T, key?: symbol | string, handler?: IDecoratorHandler<T>) {
    return (target: Object, method: string, index: number) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!meta.argumentHas(method, index)) {
            meta.argumentCreate(method, index);
        }
        if (handler) {
            handler(meta, { decoratorType: DecoratorType.argument, argument: { method, index } }, attrDta);
        }
        if (key) {
            meta.attrSetArgument(key, method, index, attrDta);
        }
    }
}



export function decoratorFactoryAll<T>(attrDta: T, key?: symbol | string, handler?: IDecoratorHandler<T>) {
    return (target: Object, propertyKey?: string, descriptorOrParamIndex?: any) => {
        if (propertyKey) {
            if (typeof descriptorOrParamIndex == 'number') {
                // argument
                decoratorFactoryArgument<T>(attrDta, key, handler)(target, propertyKey, descriptorOrParamIndex);
            } else if (descriptorOrParamIndex) {
                // method
                decoratorFactoryMethod<T>(attrDta, key, handler)(target, propertyKey, descriptorOrParamIndex);
            } else {
                // propery
                decoratorFactoryProperty<T>(attrDta, key, handler)(target, propertyKey);
            }
        } else {
            // class
            decoratorFactoryClass<T>(attrDta, key, handler)(target as Function);
        }
    };
}

export function decoratorFactoryMethodAndClass<T>(attrDta: T, key?: symbol | string, handler?: IDecoratorHandler<T>) {
    return (target: Object, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (propertyKey && descriptor) {
            // mothod
            decoratorFactoryMethod<T>(attrDta, key, handler)(target, propertyKey, descriptor);
        } else {
            // class
            decoratorFactoryClass<T>(attrDta, key, handler)(target as Classtype);
        }
    };
}

export function decoratorFactoryArgumentAndProperty<T>(attrDta: T, key?: symbol | string, handler?: IDecoratorHandler<T>) {
    return (target: Object, propertyKey: string, parameterIndex?: number) => {
        if (typeof parameterIndex == 'number') {
            // argument
            decoratorFactoryArgument<T>(attrDta, key, handler)(target, propertyKey, parameterIndex);
        } else {
            // propery
            decoratorFactoryProperty<T>(attrDta, key, handler)(target, propertyKey);
        }
    };
}