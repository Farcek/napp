import { VariableTypes } from "./variable";
export declare const $$MetakeyVariable = "design:variable";
export declare function VariableDecorator(type: VariableTypes): (target: object, propertyKey: string) => void;
export declare const Variable: typeof VariableDecorator;
export declare const Type: typeof VariableDecorator;
