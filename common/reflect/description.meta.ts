import { IMeta } from "./meta";

export const $$MetakeyDescription = "design:description";

export interface IDescriptionMeta extends IMeta {
    Description: string;
}
export class DescriptionMeta implements IDescriptionMeta {


    constructor(public Description: string, public Level: number) {

    }

    eq(o: IDescriptionMeta) {
        return o.Description === this.Description;
    }
}
