import { ReflectTypemeta } from "./type";

export interface ReflectArgumentmeta {
    index: number;

    type?: ReflectTypemeta;

    name?: string

    description?: string;

    attr?: any[]
}