export interface IProperyDecorator {
    /**
     * tuhain gishuuni ner;
     *
     * default : variavle name
     */
    name?: string;
    description?: string;
    group?: string;
    /**
     * erembleh index;
     * default: 0
     */
    index?: number;
    type?: string;
}
export declare function ProperyDecorator(options?: IProperyDecorator): (target: Object, propertyKey: string) => void;
export declare function NameDecorator(name: string): (target: Object, propertyKey?: string | undefined) => void;
export declare function DescriptionDecorator(description: string): (target: Object, propertyKey?: string | undefined) => void;
export declare function GroupDecorator(group: string): (target: Object, propertyKey?: string | undefined) => void;
export declare function IndexDecorator(index: number): (target: Object, propertyKey: string) => void;
export declare const Propery: typeof ProperyDecorator;
export declare const Name: typeof NameDecorator;
export declare const Description: typeof DescriptionDecorator;
export declare const Group: typeof GroupDecorator;
export declare const Index: typeof IndexDecorator;
