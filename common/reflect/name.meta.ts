import { BaseMeta } from "./meta";

export const $$MetakeyName = "design:name";


export class NameMeta extends BaseMeta {


    constructor(public readonly Name: string, level?: number) {
        super(level);
    }
}
