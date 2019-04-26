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

    name?: string

    description?: string;

    order?: number;
    group?: string[];
}
export interface ReflectArgumentmeta {
    index: number;

    type?: ReflectTypemeta;

    name?: string

    description?: string;
}
export interface ReflectMethodmeta {
    method: string;
    return?: ReflectTypemeta;

    name?: string;
    description?: string;

    arguments?: ReflectArgumentmeta[];
}
const $reflectKey = Symbol.for('class-reflect');
export class ReflectClassmeta {



    private name?: string;
    private description?: string;

    private properties: { [name: string]: ReflectPropertymeta } = {};
    private methods: { [name: string]: ReflectMethodmeta } = {};

    static Resolve(target: Classtype) {
        let meta: ReflectClassmeta = Reflect.getMetadata($reflectKey, target);
        if (meta instanceof ReflectClassmeta) {
            return meta;
        }
        Reflect.defineMetadata($reflectKey, meta = new ReflectClassmeta(target), target);
        return meta;
    }

    constructor(private refrence: Classtype) {

    }

    // --- class
    classSetName(name: string) {
        this.name = name;
        return this;
    }

    classGetName() {
        if (this.name) {
            return this.name;
        }

        return (this.name = this.refrence.name);
    }

    classSetDescription(description: string) {
        this.description = description;
        return this;
    }

    classGetDescription() {
        return this.description || '';
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
    properySetName(propery: string, name: string) {
        let p = this.properyHas(propery) ? this.properyGet(propery) : this.properyCreate(propery);
        p.name = name;
        return this;
    }

    properyGetName(propery: string) {
        if (this.properyHas(propery)) {
            let p = this.properyGet(propery);
            if (p.name) {
                return p.name;
            }
            return propery;
        }
        throw new Error(`not found propery. propery name = ${propery}`)
    }
    properySetDescription(propery: string, description: string) {
        let p = this.properyHas(propery) ? this.properyGet(propery) : this.properyCreate(propery);
        p.description = description;
        return this;
    }

    properyGetDescription(propery: string) {
        if (this.properyHas(propery)) {
            let p = this.properyGet(propery);
            return p.description || '';
        }
        throw new Error(`not found propery. propery name = ${propery}`)
    }
    properySetType(propery: string, type: ReflectVariableTypes) {
        let p = this.properyHas(propery) ? this.properyGet(propery) : this.properyCreate(propery);
        p.type = ReflectTypemeta.Factory(type);
        return this;
    }

    properyGetType(propery: string) {
        if (this.properyHas(propery)) {
            let p = this.properyGet(propery);

            if (p.type) {
                return p.type;
            }

            let type = Reflect.getMetadata('design:type', this.refrence.prototype, propery);
            if (type) {
                return (p.type = ReflectTypemeta.Factory(type));
            }
        }
        throw new Error(`not found propery. propery name = ${propery}`)
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

    methodSetName(method: string, name: string) {
        let m = this.methodHas(method) ? this.methodGet(method) : this.methodCreate(method);
        m.name = name;
        return this;
    }

    methodGetName(method: string) {
        if (this.methodHas(method)) {
            let m = this.methodGet(method);
            if (m.name) {
                return m.name;
            }
            return method;
        }

        throw new Error(`not found method. method name = ${method}`)
    }

    methodSetDescription(method: string, description: string) {
        let m = this.methodHas(method) ? this.methodGet(method) : this.methodCreate(method);
        m.description = description;
        return this;
    }

    methodGetDescription(method: string, description: string) {
        if (this.methodHas(method)) {
            let m = this.methodGet(method);
            return m.description || ''
        }
        throw new Error(`not found method. method name = ${method}`)
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

    argumentSetName(method: string, index: number, name: string) {
        let arg = this.argumentHas(method, index) ? this.argumentGet(method, index) : this.argumentCreate(method, index);
        arg.name = name;
        return this;
    }

    argumentGetName(method: string, index: number) {
        if (this.argumentHas(method, index)) {
            let arg = this.argumentGet(method, index);
            return arg.name || `argument${arg.index}`
        }
        throw new Error(`not found argument. method=${method}; index=${index}`);
    }

    argumentSetDescription(method: string, index: number, description: string) {
        let arg = this.argumentHas(method, index) ? this.argumentGet(method, index) : this.argumentCreate(method, index);
        arg.description = description;
        return this;
    }

    argumentGetDescription(method: string, index: number) {
        if (this.argumentHas(method, index)) {
            let arg = this.argumentGet(method, index);
            return arg.description || '';
        }
        throw new Error(`not found argument. method=${method}; index=${index}`);
    }

    argumentSetType(method: string, index: number, type: ReflectVariableTypes) {
        let arg = this.argumentHas(method, index) ? this.argumentGet(method, index) : this.argumentCreate(method, index);
        arg.type = ReflectTypemeta.Factory(type);
        return this;
    }

    argumentGetType(method: string, index: number) {
        if (this.argumentHas(method, index)) {
            let arg = this.argumentGet(method, index);
            if (arg.type) {
                return arg.type;
            }

            let params = Reflect.getMetadata('design:paramtypes', this.refrence.prototype, method);

            if (Array.isArray(params) && index in params) {
                return (arg.type = ReflectTypemeta.Factory(params[0]));
            }
        }
        throw new Error(`not found argument. method=${method}; index=${index}`);
    }

}


export function NameDecorator(name: string) {
    return (target: object, propertyKey?: string, descriptorOrParamIndex?: any) => {
        if (propertyKey) {
            let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
            if (typeof descriptorOrParamIndex == 'number') {
                // argument
                meta.argumentSetName(propertyKey, descriptorOrParamIndex, name)
            } else if (descriptorOrParamIndex) {
                // method
                meta.methodSetName(propertyKey, name);
            } else {
                // propery
                meta.properySetName(propertyKey, name);
            }
        } else {
            // class
            let meta = ReflectClassmeta.Resolve(target as Classtype);
            meta.classSetName(name);
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
                meta.argumentSetDescription(propertyKey, descriptorOrParamIndex, description)
            } else if (descriptorOrParamIndex) {
                // method
                meta.methodSetDescription(propertyKey, description);
            } else {
                // propery                
                meta.properySetDescription(propertyKey, description);
            }
        } else {
            // class
            let meta = ReflectClassmeta.Resolve(target as Classtype);
            meta.classSetDescription(description);
        }
    };
}
export const Description = DescriptionDecorator;


export function TypeDecorator(type: ReflectVariableTypes) {
    return (target: object, propertyKey: string, parameterIndex?: number) => {
        let meta = ReflectClassmeta.Resolve(target.constructor as Classtype);
        if (typeof parameterIndex == 'number') {
            // arg
            meta.argumentSetType(propertyKey, parameterIndex, type);
        } else {
            // propery
            meta.properySetType(propertyKey, type);
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