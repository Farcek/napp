import { ClassType } from "../common";
export declare class BaseMeta {
    Level: number;
    constructor(level?: number);
}
export declare enum MetaLevel {
    Level0 = 0,
    Level1 = 100,
    Level2 = 200
}
export declare namespace ReflectMeta {
    function SetMeta($$metaname: string, meta: BaseMeta, target: ClassType, propertyKey?: string): boolean;
    function GetMeta<T>($$metaname: string, target: ClassType, propertyKey?: string): T | null;
    function DeleteMeta($$metaname: string, target: ClassType, propertyKey?: string): boolean;
}
