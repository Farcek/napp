import { ClassType } from "../common";
import { DescriptionMeta } from "./description.meta";
export declare namespace ReflectDescription {
    function setMeta(meta: DescriptionMeta, target: ClassType, propertyKey?: string): boolean;
    function getMeta(target: ClassType, propertyKey?: string): DescriptionMeta | null;
}
