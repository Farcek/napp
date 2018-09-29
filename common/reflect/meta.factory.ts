import { ClassType } from "../common";

export namespace ReflectMetaFactory {
    export interface IClassDecoratorHandle {
        (target: ClassType): void
    }
    export function ClassDecorator(handle: IClassDecoratorHandle): ClassDecorator {
        return ((target: object) => {
            handle(target as ClassType);
        });
    }

    export interface IProperyDecoratorHandle {
        (target: ClassType, property: string): void
    }
    export function PropertyDecorator(handle: IProperyDecoratorHandle): PropertyDecorator {
        return ((target: Object, propertyKey: string | symbol) => {
            handle(target.constructor as ClassType, propertyKey as string);
        });
    }

    export interface IClassProperyDecoratorHandle {
        (target: ClassType, property?: string): void
    }
    export function ClassPropertyDecorator(handle: IClassProperyDecoratorHandle): ClassDecorator | PropertyDecorator {
        return ((target: Object, propertyKey?: string | symbol) => {
            if (propertyKey) {
                handle(target as ClassType);
            } else {
                handle(target.constructor as ClassType, propertyKey as string);
            }
        });
    }
}