import { VariableTypes } from "./variable";
export interface IPropertyDecorator {
    /**
     * tuhain gishuuni ner;
     *
     * default : variavle name
     */
    name?: string;
    description?: string;
    type?: VariableTypes;
}
export declare function PropertyDecorator(options?: IPropertyDecorator): (target: object, propertyKey: string, descriptor?: PropertyDescriptor | undefined) => void;
export declare const Property: typeof PropertyDecorator;
