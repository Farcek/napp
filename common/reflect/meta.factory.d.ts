import { ClassType } from "../common";
export declare namespace ReflectDecoratorFactory {
    interface IClassDecoratorHandle {
        (target: ClassType): void;
    }
    function ClassDecorator(handle: IClassDecoratorHandle): ClassDecorator;
    interface IProperyDecoratorHandle {
        (target: ClassType, property: string): void;
    }
    function PropertyDecorator(handle: IProperyDecoratorHandle): PropertyDecorator;
    interface IClassProperyDecoratorHandle {
        (target: ClassType, property?: string): void;
    }
    function ClassPropertyDecorator(handle: IClassProperyDecoratorHandle): ClassDecorator | PropertyDecorator;
}
