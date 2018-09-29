import { VariableTypes, VariableMeta } from "./variable";
import { ClassType } from "../common";
export declare namespace ReflectVariable {
    function factoryVariableMetaArray(elementType: VariableMeta, level?: number): VariableMeta;
    function factoryVariableMeta(type: VariableTypes, level?: number): VariableMeta;
    function setVariableMeta(meta: VariableMeta, target: ClassType, propertyKey: string): boolean;
    function getVariableMeta(target: ClassType, propertyKey: string): VariableMeta | null;
}
