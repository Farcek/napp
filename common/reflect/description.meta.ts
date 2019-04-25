import { BaseMeta } from "./meta";

export const $$MetakeyDescription = "design:description";


export class DescriptionMeta extends BaseMeta {


    constructor(public readonly Description: string, level?: number) {
        super(level);
    }
}
