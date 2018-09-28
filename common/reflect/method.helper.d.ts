import { NameMeta } from "./name.meta";
import { ClassType } from "../common";
export declare namespace ReflectMethod {
    function getMethodMeta(target: ClassType, propertyKey: string): NameMeta | null;
}
