import { IMeta } from "./meta";
export declare const $$MetakeyName = "design:name";
export interface INameMeta extends IMeta {
    Name: string;
}
export declare class NameMeta implements INameMeta {
    Name: string;
    Level: number;
    constructor(Name: string, Level: number);
    eq(o: INameMeta): boolean;
}
