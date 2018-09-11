import { IMeta } from "./meta";

export const $$MetakeyProperties = "design:properties";

export class PropertiesMeta implements IMeta {
    Level: number = 0;
    Names: { [key: string]: boolean } = {};

    add(name: string) {
        this.Names[name] = true;
    }

    map<U>(callbackfn: (properyVariableName: string) => U): U[] {
        return Object.keys(this.Names).map(callbackfn);
    }
}
