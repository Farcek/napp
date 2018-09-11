import { IMeta } from "./meta";

export const $$MetakeyName = "design:name";

export interface INameMeta extends IMeta {
    Name: string;
}
export class NameMeta implements INameMeta {


    constructor(public Name: string, public Level: number) {

    }

    eq(o: INameMeta) {
        return o.Name === this.Name;
    }
}
