import { ReflectTypemeta } from "./type";

export interface ReflectPropertymeta {
    propery: string;

    type?: ReflectTypemeta;

    name?: string

    description?: string;

    order?: number;
    group?: string[];

    attr?: any[]
}