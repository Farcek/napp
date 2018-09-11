import { ReflectMeta, MetaLevel } from "./meta";
import { NameMeta, $$MetakeyName } from "./name.meta";
import { ClassType } from "../common";

export namespace ReflectName {
    export function setNameMeta(meta: NameMeta, target: ClassType, propertyKey?: string): boolean {
        return ReflectMeta.SetMeta($$MetakeyName, meta, target, propertyKey);
    }

    export function getNameMeta(target: ClassType, propertyKey?: string): NameMeta | null {

        

        if (propertyKey) {
            let pMeta = ReflectMeta.GetMeta<NameMeta>($$MetakeyName, target, propertyKey);
            if (pMeta instanceof NameMeta) {
                return pMeta;
            }
            return null;
        }

        let cMeta = ReflectMeta.GetMeta<NameMeta>($$MetakeyName, target);

        if (cMeta) {
            return cMeta;
        }




        if (target && target.name) {
            let meta = new NameMeta(target.name, MetaLevel.Level0);
            setNameMeta(meta, target);
            return meta;
        }

        return null;

    }
}

