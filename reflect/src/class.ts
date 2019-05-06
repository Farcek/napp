import { ReflectPropertymeta } from "./property";
import { ReflectMethodmeta } from "./method";
import { Classtype } from "./common";
import { ReflectTypes, ReflectTypemeta } from "./type";
import { ReflectArgumentmeta } from "./argument";

const $reflectKey = Symbol.for('class-reflect');
export class ReflectClassmeta {



    private name?: string;
    private description?: string;

    private properties: { [name: string]: ReflectPropertymeta } = {};
    private methods: { [name: string]: ReflectMethodmeta } = {};

    private attr?: { [key: string]: any }

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

    get refrenceType() {
        return this.refrence;
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
    propertyHas(property: string) {
        return property in this.properties;
    }
    propertyGet(property: string) {
        return this.properties[property];
    }
    propertyCreate(property: string): ReflectPropertymeta {
        return this.properties[property] = { propery: property };
    }
    propertySetName(property: string, name: string) {
        let p = this.propertyHas(property) ? this.propertyGet(property) : this.propertyCreate(property);
        p.name = name;
        return this;
    }

    propertyGetName(property: string) {
        if (this.propertyHas(property)) {
            let p = this.propertyGet(property);
            if (p.name) {
                return p.name;
            }
            return property;
        }
        throw new Error(`not found property. property name = ${property}`)
    }
    propertySetDescription(property: string, description: string) {
        let p = this.propertyHas(property) ? this.propertyGet(property) : this.propertyCreate(property);
        p.description = description;
        return this;
    }

    propertyGetDescription(property: string) {
        if (this.propertyHas(property)) {
            let p = this.propertyGet(property);
            return p.description || '';
        }
        throw new Error(`not found propery. propery name = ${property}`)
    }
    propertySetType(property: string, type: ReflectTypes, isArray:boolean) {
        let p = this.propertyHas(property) ? this.propertyGet(property) : this.propertyCreate(property);
        p.type = ReflectTypemeta.Factory(type, isArray);
        return this;
    }

    propertyGetType(property: string) {
        if (this.propertyHas(property)) {
            let p = this.propertyGet(property);

            if (p.type) {
                return p.type;
            }

            let type = Reflect.getMetadata('design:type', this.refrence.prototype, property);
            return (p.type = ReflectTypemeta.Factory(type, false));
        }
        throw new Error(`not found propery. propery name = ${property}`)
    }

    propertyNames() {
        return Object.keys(this.properties);
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

    methodSetReturn(method: string, type: ReflectTypes, isArray:boolean) {
        let m = this.methodHas(method) ? this.methodGet(method) : this.methodCreate(method);
        m.return = ReflectTypemeta.Factory(type, isArray);
        return this;
    }
    methodGetReturn(method: string) {
        if (this.methodHas(method)) {
            let m = this.methodGet(method);
            if (m.return) {
                return m.return;
            }

            let type = Reflect.getMetadata('design:returntype', this.refrence.prototype, method);

            return (m.return = ReflectTypemeta.Factory(type, false));

        }

        throw new Error(`not found method. method name = ${method}`)
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

    methodGetDescription(method: string) {
        if (this.methodHas(method)) {
            let m = this.methodGet(method);
            return m.description || ''
        }
        console.log(`not found method. method name = ${method}`, `refrence:`,this.refrence )
        throw new Error(`not found method. method name = ${method}`)
    }

    // argument
    argumentHas(method: string, index: number) {
        if (this.methodHas(method)) {
            let m = this.methodGet(method);

            if (m.arguments) {
                return index >= 0 && index < m.arguments.length;
            }
        }
        return false;
    }

    argumentGet(method: string, index: number): ReflectArgumentmeta {
        let m = this.methodGet(method);
        if (m && m.arguments && index >= 0 && index < m.arguments.length) {
            return m.arguments[index] || (m.arguments[index] = { index });
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

    argumentSetType(method: string, index: number, type: ReflectTypes, isArray:boolean) {
        let arg = this.argumentHas(method, index) ? this.argumentGet(method, index) : this.argumentCreate(method, index);
        arg.type = ReflectTypemeta.Factory(type, isArray);
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
                return (arg.type = ReflectTypemeta.Factory(params[index], false));
            }

            return arg.type = ReflectTypemeta.Factory(null as any, false);
        }
        throw new Error(`not found argument. method=${method}; index=${index}`);
    }


    // attr

    attrSetClass( key: symbol | string , attr: any) {
        let attrs = this.attr || (this.attr = {});
        if (key in attrs) {
            new Error(`already defined class attr. key="${key.toString()}"`)
        }
        attrs[key as string] = attr;

        return this;
    }
    attrGetClass(key: symbol | string) {
        if (this.attr && key in this.attr) {
            return this.attr[key as any];
        }
        return null;
    }
    attrSetProperty(key: symbol | string, property: string, attr: any) {
        let p = this.propertyHas(property) ? this.propertyGet(property) : this.propertyCreate(property);
        let attrs = p.attr || (p.attr = {});
        if (key in attrs) {
            new Error(`already defined property attr. key="${key.toString()}"; property="${property}"`);
        }
        attrs[key as string] = attr;
        return this;
    }
    attrGetProperty(key: symbol | string, propery: string) {
        if (this.propertyHas(propery)) {
            let p = this.propertyGet(propery);
            if (p.attr && key in p.attr) {
                return p.attr[key as string];
            }
            return null;
        }
        throw new Error(`not found propery. propery=${propery};`)
    }

    attrSetMethod(key: symbol | string, method: string, attr: any) {
        let m = this.methodHas(method) ? this.methodGet(method) : this.methodCreate(method);
        let attrs = m.attr || (m.attr = {});
        if (key in attrs) {
            new Error(`already defined method attr. key="${key.toString()}"; method="${method}"`);
        }
        attrs[key as string] = attr;
        return this;
    }
    attrGetMethod(key: symbol | string, method: string) {
        if (this.methodHas(method)) {
            let m = this.methodGet(method);
            if (m.attr && key in m.attr) {
                return m.attr[key as string];
            }
            return null;
        }
        throw new Error(`not found method. method=${method};`)
    }

    attrSetArgument(key: symbol | string, method: string, index: number, attr: any) {
        let a = this.argumentHas(method, index) ? this.argumentGet(method, index) : this.argumentCreate(method, index);
        let attrs = a.attr || (a.attr = {});
        if (key in attrs) {
            new Error(`already defined argument attr. key="${key.toString()}"; method="${method}"; index=${index}`);
        }
        attrs[key as string] = attr;
        return this;
    }

    attrGetArguments(key: symbol | string, method: string, index: number) {
        if (this.argumentHas(method, index)) {
            let a = this.argumentGet(method, index);
            if (a.attr && key in a.attr) {
                return a.attr[key as string];
            }
            return null;
        }
        throw new Error(`not found argument. method=${method}; index=${index}`)
    }
}
