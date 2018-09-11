
import { VariableType, VariablePrimitiveType, VariableTypes, VariableMeta } from "./variable";
import { ClassType } from "../common";
import { initMetadata } from "./helper";
import { $$MetakeyProperties, PropertiesMeta } from "./property.meta";
import { ReflectMeta } from "./meta";

export namespace ReflectProperty {

    export function GetProperiesMeta(cls: ClassType): PropertiesMeta {

        let m: PropertiesMeta | null = ReflectMeta.GetMeta($$MetakeyProperties, cls);

        if (m && m instanceof PropertiesMeta) {
            return m;
        }

        m = new PropertiesMeta();

        ReflectMeta.SetMeta($$MetakeyProperties, m, cls);
        return m;
    }

    
}

