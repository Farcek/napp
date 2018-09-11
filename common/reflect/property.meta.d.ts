import { IMeta } from "./meta";
export declare const $$MetakeyProperties = "design:properties";
export declare class PropertiesMeta implements IMeta {
    Level: number;
    Names: {
        [key: string]: boolean;
    };
    add(name: string): void;
    map<U>(callbackfn: (properyVariableName: string) => U): U[];
}
