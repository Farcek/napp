import { ClassType } from "../common";
import { PropertyType, PropertyPrimaryType } from "./common";


export const PropertyMetaName = "design:propery:name";
export const PropertyMetaType = "design:propery:type";

export const PropertyMetaIndex = "design:propery:index";
export const PropertyMetaDescription = "design:propery:description";
export const PropertyMetaGroup = "design:propery:group";

export const PropertyMetaKeys = "design:property:names[]";

export interface IPropertyMeta {
    Type: PropertyType;
    Refrence: PropertyPrimaryType | ClassType;
}
export class PropertyMeta {
    Type: PropertyType = PropertyType.Primary;
    Refrence?: PropertyPrimaryType | ClassType;
}
