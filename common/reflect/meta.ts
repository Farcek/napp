import { ClassType } from "../common";

export class BaseMeta {
    Level: number = 0;

    constructor(level?: number) {
        this.Level = level || 0;
    }
}

export enum MetaLevel {
    Level0 = 0,
    Level1 = 100,
    Level2 = 200,
    // Level3 = 300,
    // Level4 = 400,
}

export namespace ReflectMeta {

    export function SetMeta($$metaname: string, meta: BaseMeta, target: ClassType, propertyKey?: string): boolean {
        let old: BaseMeta | null = Reflect.getOwnMetadata($$metaname, target.prototype, propertyKey as any);

        
        if (!old || (old && old.Level <= meta.Level)) {
            Reflect.defineMetadata($$metaname, meta, target.prototype, propertyKey as any);
            return true;
        }
        return false;
    }

    export function GetMeta<T>($$metaname: string, target: ClassType, propertyKey?: string): T | null {
        let m = Reflect.getOwnMetadata($$metaname, target.prototype, propertyKey as any);
        if (m) {
            return m;
        }
        return null;
    }

    export function DeleteMeta($$metaname: string, target: ClassType, propertyKey?: string): boolean {

        return Reflect.deleteMetadata($$metaname, target.prototype, propertyKey as any);
    }
}

