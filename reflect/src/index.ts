export interface Classtype {
    new(...args: any[]): any;
}
export enum ReflectVariableType {
    Void = 1,
    Int, Float,
    String,
    Boolean,
    Date,
    Array,
    Complex
}

// tslint:disable-next-line:ban-types
export type ReflectVariableTypes = "string" | StringConstructor | "int" | "float" | NumberConstructor | "boolean" | BooleanConstructor | "date" | DateConstructor | Classtype;



export class ReflectTypemeta {


    constructor(private option: {
        type: ReflectVariableType,
        ref: Classtype,
        name: string,
        isArray: boolean
    }) {

    }

    get type() {
        return this.option.type;
    }
    get ref() {
        return this.option.ref;
    }
    get name() {
        return this.option.name;
    }
    get isArray() {
        return this.option.isArray;
    }

    static Factory(type: ReflectVariableTypes) {
        if (type) {
            if (type === String || type === "string") {
                return new ReflectTypemeta({
                    type: ReflectVariableType.String,
                    ref: String,
                    name: "string",
                    isArray: false
                });
            }

            if (type === Number || type === "int") {
                return new ReflectTypemeta({
                    type: ReflectVariableType.Int,
                    name: "int",
                    ref: Number,
                    isArray: false
                });
            }

            if (type === "float") {
                return new ReflectTypemeta({
                    type: ReflectVariableType.Float,
                    name: "float",
                    ref: Number,
                    isArray: false
                });
            }



            if (type === Boolean || type === "boolean") {
                return new ReflectTypemeta({
                    type: ReflectVariableType.Boolean,
                    name: "boolean",
                    ref: Boolean,
                    isArray: false
                });
            }
            if (type === Date || type === "date") {
                return new ReflectTypemeta({
                    type: ReflectVariableType.Date,
                    name: "date",
                    ref: Date,
                    isArray: false
                });
            }

            return new ReflectTypemeta({
                type: ReflectVariableType.Complex,
                name: type.name,
                ref: type,
                isArray: false
            });
        }

        return new ReflectTypemeta({
            type: ReflectVariableType.Void,
            name: "void",
            ref: Object,
            isArray: false
        });
    }
}

export interface ReflectPropertymeta {
    propery: string;

    type?: ReflectTypemeta;

    name?: string[]

    description?: string[];

    order?: number;
    group?: string[];
}
export interface ReflectArgumentmeta {
    index: number;

    type?: ReflectTypemeta;

    name?: string[]

    description?: string[];
}
export interface ReflectMethodmeta {
    method: string;
    return?: ReflectTypemeta;

    name?: string[];
    description?: string[];

    arguments?: ReflectArgumentmeta[];
}
export class ReflectClassmeta {

    id = Math.random()

    name?: string[];
    description?: string[];

    properties: { [name: string]: ReflectPropertymeta } = {};
    methods: { [name: string]: ReflectMethodmeta } = {};

    static Resolve(target: Classtype) {
        let meta: ReflectClassmeta = Reflect.getMetadata($names.classmeta, target);
        if (meta instanceof ReflectClassmeta) return meta;

        Reflect.defineMetadata($names.classmeta, meta = new ReflectClassmeta(), target);
        return meta;
    }

    // --- class
    classAddName(name: string) {
        let names = this.name || (this.name = []);
        names.unshift(name);
        return this;
    }

    classAddDescription(description: string) {
        let descriptions = this.description || (this.description = []);
        descriptions.unshift(description);
        return this;
    }


    // --- propery
    properyHas(propery: string) {
        return propery in this.properties;
    }
    properyGet(propery: string) {
        return this.properties[propery];
    }
    properyCreate(propery: string): ReflectPropertymeta {
        return this.properties[propery] = { propery };
    }
    properyAddName(propery: string, name: string) {
        let p = this.properyHas(propery) ? this.properyGet(propery) : this.properyCreate(propery);

        let names = p.name || (p.name = []);
        names.unshift(name);
        return this;
    }
    properyAddDescription(propery: string, description: string) {
        let p = this.properyHas(propery) ? this.properyGet(propery) : this.properyCreate(propery);

        let descriptions = p.description || (p.description = []);
        descriptions.unshift(description);
        return this;
    }
    properySettype(propery: string, type: ReflectVariableTypes) {
        let p = this.properyHas(propery) ? this.properyGet(propery) : this.properyCreate(propery);
        p.type = ReflectTypemeta.Factory(type);
        return this;
    }

    // method 
    methodHas(method: string) {
        return method in this.methods;
    }
    methodGet(method: string) {
        return this.methods[method];
    }
    methodCreate(method: string): ReflectMethodmeta {
        return this.methods[method] = { method };
    }

    methodSetReturn(method: string, type: ReflectVariableTypes) {
        let m = this.methodHas(method) ? this.methodGet(method) : this.methodCreate(method);
        m.return = ReflectTypemeta.Factory(type);
        return this;
    }

    methodAddName(method: string, name: string) {
        let m = this.methodHas(method) ? this.methodGet(method) : this.methodCreate(method);
        let names = m.name || (m.name = []);
        names.push(name);
        return this;
    }

    methodAddDescription(method: string, name: string) {
        let m = this.methodHas(method) ? this.methodGet(method) : this.methodCreate(method);
        let descriptions = m.description || (m.description = []);
        descriptions.push(name);
        return this;
    }

    // argument
    argumentHas(method: string, index: number) {
        if (this.methodHas(method)) {
            let m = this.methodGet(method);
            if (m.arguments) {
                return index in m.arguments
            }
        }
        return false;
    }

    argumentGet(method: string, index: number) {
        let m = this.methodGet(method);
        if (m && m.arguments) {
            return m.arguments[index];
        }
        throw new Error(`not found argument. method=${method}; index=${index}`);
    }
    argumentsGet(method: string) {
        let m = this.methodGet(method);
        if (m && m.arguments) {
            return m.arguments;
        }
        return [];
    }

    argumentCreate(method: string, index: number): ReflectArgumentmeta {
        if (!this.methodHas(method)) {
            this.methodCreate(method);
        }

        let m = this.methodGet(method);
        let args = m.arguments || (m.arguments = []);
        let arg = args[index] = { index };
        return arg;
    }

    argumentAddName(method: string, index: number, name: string) {
        let arg = this.argumentHas(method, index) ? this.argumentGet(method, index) : this.argumentCreate(method, index);
        let names = arg.name || (arg.name = []);
        names.push(name);
        return this;
    }

    argumentAddDescription(method: string, index: number, description: string) {
        let arg = this.argumentHas(method, index) ? this.argumentGet(method, index) : this.argumentCreate(method, index);
        let descriptions = arg.description || (arg.description = []);
        descriptions.push(description);
        return this;
    }

    argumentSettype(method: string, index: number, type: ReflectVariableTypes) {
        let arg = this.argumentHas(method, index) ? this.argumentGet(method, index) : this.argumentCreate(method, index);
        arg.type = ReflectTypemeta.Factory(type);
        return this;
    }

}

export const $names = {
    names: Symbol.for('name'),
    descriptions: Symbol.for('descriptions'),
    classmeta: Symbol.for('name')
}

export function NameDecorator(name: string) {
    return (target: object, propertyKey?: string, descriptorOrParamIndex?: any) => {
        if (propertyKey) {
            let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
            if (typeof descriptorOrParamIndex == 'number') {
                // argument
                meta.argumentAddName(propertyKey, descriptorOrParamIndex, name)
            } else if (descriptorOrParamIndex) {
                // method
                meta.methodAddName(propertyKey, name);
            } else {
                // propery                
                meta.properyAddName(propertyKey, name);
            }
        } else {
            // class

            let meta = ReflectClassmeta.Resolve(target as Classtype);
            meta.classAddName(name);
        }
    };
}


export const Name = NameDecorator;
export function DescriptionDecorator(description: string) {
    return (target: object, propertyKey?: string, descriptorOrParamIndex?: any) => {
        if (propertyKey) {
            let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
            if (typeof descriptorOrParamIndex == 'number') {
                // argument
                meta.argumentAddDescription(propertyKey, descriptorOrParamIndex, description)
            } else if (descriptorOrParamIndex) {
                // method
                meta.methodAddDescription(propertyKey, description);
            } else {
                // propery                
                meta.properyAddDescription(propertyKey, description);
            }
        } else {
            // class
            let meta = ReflectClassmeta.Resolve(target as Classtype);
            meta.classAddDescription(description);
        }
    };
}
export const Description = DescriptionDecorator;


export function TypeDecorator(type: ReflectVariableTypes) {
    return (target: object, propertyKey: string, parameterIndex?: number) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (typeof parameterIndex == 'number') {
            meta.argumentSettype(propertyKey, parameterIndex, type);
        } else {

            meta.properySettype(propertyKey, type);
        }
    };
}
export const Type = TypeDecorator;


export function ReturnDecorator(type: ReflectVariableTypes) {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        meta.methodSetReturn(propertyKey, type);
    };
}

export const Return = ReturnDecorator;