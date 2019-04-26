import { ReflectTypemeta } from "./type";
import { ReflectArgumentmeta } from "./argument";

export interface ReflectMethodmeta {
    method: string;
    return?: ReflectTypemeta;

    name?: string;
    description?: string;

    arguments?: ReflectArgumentmeta[];

    attr?: any[]
}