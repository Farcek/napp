import { BaseMeta } from "./meta";

export const $$MetakeyProperties = "design:properties";

export class PropertiesMeta extends BaseMeta {

    Names: { [key: string]: boolean } = {};

    add(name: string) {
        this.Names[name] = true;
    }

    map<U>(callbackfn: (properyVariableName: string) => U): U[] {
        return Object.keys(this.Names).map(callbackfn);
    }
}
