import { ClassType } from "../common";
import { PropertyType, PropertyPrimaryType } from "./common";
export declare const PropertyMetaName = "design:propery:name";
export declare const PropertyMetaType = "design:propery:type";
export declare const PropertyMetaIndex = "design:propery:index";
export declare const PropertyMetaDescription = "design:propery:description";
export declare const PropertyMetaGroup = "design:propery:group";
export declare const PropertyMetaKeys = "design:property:names[]";
export interface IPropertyMeta {
    Type: PropertyType;
    Refrence: PropertyPrimaryType | ClassType;
}
export declare class PropertyMeta {
    Type: PropertyType;
    Refrence?: PropertyPrimaryType | ClassType;
}
