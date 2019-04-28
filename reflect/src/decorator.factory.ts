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
export interface IDecoratorConfigure<T> {
    /**
     * return true. push to attr 
     */
    (meta: ReflectClassmeta, decoratorOption: IDecoratorOption, option: T): void;
}

export function decoratorFactoryClass<T>(key?: string, configure?: IDecoratorConfigure<T>) {
    return (option: T): ClassDecorator => (target: Function) => {
        let meta = ReflectClassmeta.Resolve(target as Classtype);
        if (configure) {
            configure(meta, { decoratorType: DecoratorType.class }, option)
        }
        if (key) {
            meta.attrSetClass(key, option);
        }
    }
}

export function decoratorFactoryProperty<T>(key?: string, configure?: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, propertyKey: string) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!meta.properyHas(propertyKey)) {
            meta.properyCreate(propertyKey);
        }
        if (configure) {
            configure(meta, { decoratorType: DecoratorType.property, property: { name: propertyKey } }, option);
        }
        if (key) {
            meta.attrSetProperty(key, propertyKey, option);
        }
    }
}

export function decoratorFactoryMethod<T>(key?: string, configure?: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, method: string, descriptor: TypedPropertyDescriptor<any>) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!meta.methodHas(method)) {
            meta.methodCreate(method);
        }
        if (configure) {
            configure(meta, { decoratorType: DecoratorType.method, method: { name: method, descriptor } }, option);
        }
        if (key) {
            meta.attrSetMethod(key, method, option);
        }
    }
}

export function decoratorFactoryArgument<T>(key?: string, configure?: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, method: string, index: number) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!meta.argumentHas(method, index)) {
            meta.argumentCreate(method, index);
        }
        if (configure) {
            configure(meta, { decoratorType: DecoratorType.argument, argument: { method, index } }, option);
        }
        if (key) {
            meta.attrSetArgument(key, method, index, option);
        }
    }
}

export function decoratorFactoryAll<T>(key?: string, configure?: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, propertyKey?: string, descriptorOrParamIndex?: any) => {
        if (propertyKey) {
            if (typeof descriptorOrParamIndex == 'number') {
                // argument
                decoratorFactoryArgument<T>(key, configure)(option)(target, propertyKey, descriptorOrParamIndex);
            } else if (descriptorOrParamIndex) {
                // method
                decoratorFactoryMethod<T>(key, configure)(option)(target, propertyKey, descriptorOrParamIndex);
            } else {
                // propery
                decoratorFactoryProperty<T>(key, configure)(option)(target, propertyKey);
            }
        } else {
            // class
            decoratorFactoryClass<T>(key, configure)(option)(target as Function);
        }
    };
}

export function decoratorFactoryMethodAndClass<T>(key?: string, configure?: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (propertyKey && descriptor) {
            // mothod
            decoratorFactoryMethod<T>(key, configure)(option)(target, propertyKey, descriptor);
        } else {
            // class
            decoratorFactoryClass<T>(key, configure)(option)(target as Classtype);
        }
    };
}

export function decoratorFactoryArgumentAndProperty<T>(key?: string, configure?: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, propertyKey: string, parameterIndex?: number) => {
        if (typeof parameterIndex == 'number') {
            // argument
            decoratorFactoryArgument<T>(key, configure)(option)(target, propertyKey, parameterIndex);
        } else {
            // propery
            decoratorFactoryProperty<T>(key, configure)(option)(target, propertyKey);
        }
    };
}