import { ReflectClassmeta } from "./class";
import { Classtype } from "./common";

export enum DecoratorType {
    class = 2,
    property = 4,
    method = 8,
    argument = 16
}

export interface IDecoratorOption {
    classmeta: ReflectClassmeta;
    decoratorType: DecoratorType;

    property?: { name: string }
    method?: { name: string, descriptor: TypedPropertyDescriptor<any> }
    argument?: { method: string, index: number }
}
export interface IDecoratorHandler<T> {
    (targer: Object, decoratorOption: IDecoratorOption): T;
}



export function decoratorFactoryClass<T>(handler: IDecoratorHandler<T>, key?: symbol | string, ) {
    return (target: Function) => {
        let classmeta = ReflectClassmeta.Resolve(target as Classtype);
        let attrDta = handler(target, { classmeta, decoratorType: DecoratorType.class });
        if (key) {
            classmeta.attrSetClass(key, attrDta);
        }
    }
}
export function decoratorFactoryProperty<T>(handler: IDecoratorHandler<T>, key?: symbol | string) {
    return (target: Object, propertyKey: string) => {
        let classmeta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!classmeta.propertyHas(propertyKey)) {
            classmeta.propertyCreate(propertyKey);
        }
        let attrDta = handler(classmeta, { classmeta, decoratorType: DecoratorType.property, property: { name: propertyKey } });
        if (key) {
            classmeta.attrSetProperty(key, propertyKey, attrDta);
        }
    }
}

export function decoratorFactoryMethod<T>(handler: IDecoratorHandler<T>, key?: symbol | string, ) {
    return (target: Object, method: string, descriptor: TypedPropertyDescriptor<any>) => {
        let classmeta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!classmeta.methodHas(method)) {
            classmeta.methodCreate(method);
        }
        let attrDta = handler(target, { classmeta, decoratorType: DecoratorType.method, method: { name: method, descriptor } });
        if (key) {
            classmeta.attrSetMethod(key, method, attrDta);
        }
    }
}

export function decoratorFactoryArgument<T>(handler: IDecoratorHandler<T>, key?: symbol | string) {
    return (target: Object, method: string, index: number) => {
        let classmeta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (!classmeta.argumentHas(method, index)) {
            classmeta.argumentCreate(method, index);
        }
        let attrDta = handler(target, { classmeta, decoratorType: DecoratorType.argument, argument: { method, index } });
        if (key) {
            classmeta.attrSetArgument(key, method, index, attrDta);
        }
    }
}



export function decoratorFactoryAll<T>(handler: IDecoratorHandler<T>, key?: symbol | string) {
    return (target: Object, propertyKey?: string, descriptorOrParamIndex?: any) => {
        if (propertyKey) {
            if (typeof descriptorOrParamIndex == 'number') {
                // argument
                decoratorFactoryArgument<T>(handler, key)(target, propertyKey, descriptorOrParamIndex);
            } else if (descriptorOrParamIndex) {
                // method
                decoratorFactoryMethod<T>(handler, key)(target, propertyKey, descriptorOrParamIndex);
            } else {
                // propery
                decoratorFactoryProperty<T>(handler, key)(target, propertyKey);
            }
        } else {
            // class
            decoratorFactoryClass<T>(handler, key)(target as Function);
        }
    };
}

export function decoratorFactoryMethodAndClass<T>(handler: IDecoratorHandler<T>, key?: symbol | string) {
    return (target: Object, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (propertyKey && descriptor) {
            // mothod
            decoratorFactoryMethod<T>(handler, key)(target, propertyKey, descriptor);
        } else {
            // class
            decoratorFactoryClass<T>(handler, key)(target as Classtype);
        }
    };
}

export function decoratorFactoryArgumentAndProperty<T>(handler: IDecoratorHandler<T>, key?: symbol | string) {
    return (target: Object, propertyKey: string, parameterIndex?: number) => {
        if (typeof parameterIndex == 'number') {
            // argument
            decoratorFactoryArgument<T>(handler, key)(target, propertyKey, parameterIndex);
        } else {
            // propery
            decoratorFactoryProperty<T>(handler, key)(target, propertyKey);
        }
    };
}