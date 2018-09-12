import { VariableTypes, VariableMeta, IVariableMeta } from "./variable";
import { ClassType } from "../common";
export declare namespace ReflectVariable {
    function factoryVariableMetaArray(elementType: IVariableMeta, level?: number): VariableMeta;
    function factoryVariableMeta(type: VariableTypes, level?: number): VariableMeta;
    function setVariableMeta(meta: IVariableMeta, target: ClassType, propertyKey: string): boolean;
    function getVariableMeta(target: ClassType, propertyKey: string): VariableMeta | null;
}
