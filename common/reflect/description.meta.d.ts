import { IMeta } from "./meta";
export declare const $$MetakeyDescription = "design:description";
export interface IDescriptionMeta extends IMeta {
    Description: string;
}
export declare class DescriptionMeta implements IDescriptionMeta {
    Description: string;
    Level: number;
    constructor(Description: string, Level: number);
    eq(o: IDescriptionMeta): boolean;
}
