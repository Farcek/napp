import { ReflectMeta, MetaLevel } from "./meta";

import { ClassType } from "../common";
import { $$MetakeyDescription, DescriptionMeta } from "./description.meta";

export namespace ReflectDescription {
    export function setMeta(meta: DescriptionMeta, target: ClassType, propertyKey?: string): boolean {
        return ReflectMeta.SetMeta($$MetakeyDescription, meta, target, propertyKey);
    }

    export function getMeta(target: ClassType, propertyKey?: string): DescriptionMeta | null {
        if (propertyKey) {
            let pMeta = ReflectMeta.GetMeta<DescriptionMeta>($$MetakeyDescription, target, propertyKey);
            if (pMeta instanceof DescriptionMeta) {
                return pMeta;
            }
            return null;
        }

        let cMeta = ReflectMeta.GetMeta<DescriptionMeta>($$MetakeyDescription, target);

        if (cMeta) {
            return cMeta;
        }
      

        return null;

    }
}

