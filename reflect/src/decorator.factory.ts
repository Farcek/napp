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
    (meta: ReflectClassmeta, decoratorOption: IDecoratorOption, option: T): boolean;
}

export function decoratorFactoryClass<T>(configure: IDecoratorConfigure<T>) {
    return (option: T): ClassDecorator => (target: Function) => {
        let meta = ReflectClassmeta.Resolve(target as Classtype);
        let push = configure(meta, { decoratorType: DecoratorType.class }, option);
        if (push) {
            meta.attrAddClass(option);
        }
    }
}

export function decoratorFactoryProperty<T>(configure: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, propertyKey: string) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!meta.properyHas(propertyKey)) {
            meta.properyCreate(propertyKey);
        }
        let push = configure(meta, { decoratorType: DecoratorType.property, property: { name: propertyKey } }, option);
        if (push) {
            meta.attrAddPropery(propertyKey, option);
        }
    }
}

export function decoratorFactoryMethod<T>(configure: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, method: string, descriptor: TypedPropertyDescriptor<any>) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!meta.methodHas(method)) {
            meta.methodCreate(method);
        }
        let push = configure(meta, { decoratorType: DecoratorType.method, method: { name: method, descriptor } }, option);
        if (push) {
            meta.attrAddMethod(method, option);
        }
    }
}

export function decoratorFactoryArgument<T>(configure: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, method: string, index: number) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!meta.argumentHas(method, index)) {
            meta.argumentCreate(method, index);
        }
        let push = configure(meta, { decoratorType: DecoratorType.argument, argument: { method, index } }, option);
        if (push) {
            meta.attrAddArgument(method, index, option);
        }
    }
}

export function decoratorFactoryAll<T>(configure: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, propertyKey?: string, descriptorOrParamIndex?: any) => {
        if (propertyKey) {
            if (typeof descriptorOrParamIndex == 'number') {
                // argument
                decoratorFactoryArgument<T>(configure)(option)(target, propertyKey, descriptorOrParamIndex);
            } else if (descriptorOrParamIndex) {
                // method
                decoratorFactoryMethod<T>(configure)(option)(target, propertyKey, descriptorOrParamIndex);
            } else {
                // propery
                decoratorFactoryProperty<T>(configure)(option)(target, propertyKey);
            }
        } else {
            // class
            decoratorFactoryClass<T>(configure)(option)(target as Function);
        }
    };
}

export function decoratorFactoryArgumentAndProperty<T>(configure: IDecoratorConfigure<T>) {
    return (option: T) => (target: Object, propertyKey: string, parameterIndex?: number) => {
        if (typeof parameterIndex == 'number') {
            // argument
            decoratorFactoryArgument<T>(configure)(option)(target, propertyKey, parameterIndex);
        } else {
            // propery
            decoratorFactoryProperty<T>(configure)(option)(target, propertyKey);
        }
    };
}