import { NameMeta } from "./name.meta";
import { ClassType } from "../common";
export declare namespace ReflectName {
    function setNameMeta(meta: NameMeta, target: ClassType, propertyKey?: string): boolean;
    function getNameMeta(target: ClassType, propertyKey?: string): NameMeta | null;
}
