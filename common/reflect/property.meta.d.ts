import { BaseMeta } from "./meta";
export declare const $$MetakeyProperties = "design:properties";
export declare class PropertiesMeta extends BaseMeta {
    Names: {
        [key: string]: boolean;
    };
    add(name: string): void;
    map<U>(callbackfn: (properyVariableName: string) => U): U[];
}
