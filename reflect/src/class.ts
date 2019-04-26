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
    properySetType(propery: string, type: ReflectTypes) {
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
            return (p.type = ReflectTypemeta.Factory(type));
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

    methodSetReturn(method: string, type: ReflectTypes) {
        let m = this.methodHas(method) ? this.methodGet(method) : this.methodCreate(method);
        m.return = ReflectTypemeta.Factory(type);
        return this;
    }
    methodGetReturn(method: string) {
        if (this.methodHas(method)) {
            let m = this.methodGet(method);
            if (m.return) {
                return m.return;
            }

            let type = Reflect.getMetadata('design:returntype', this.refrence.prototype, method);

            return (m.return = ReflectTypemeta.Factory(type));

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

    argumentSetType(method: string, index: number, type: ReflectTypes) {
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
                return (arg.type = ReflectTypemeta.Factory(params[index]));
            }

            return arg.type = ReflectTypemeta.Factory(null as any);
        }
        throw new Error(`not found argument. method=${method}; index=${index}`);
    }


    // attr

    attrSetClass(key: string, attr: any) {
        let attrs = this.attr || (this.attr = {});
        if (key in attrs) {
            new Error(`already defined class attr. key="${key}"`)
        }
        attrs[key] = attr;

        return this;
    }
    attrGetClass(key: string) {
        if (this.attr && key in this.attr) {
            return this.attr[key];
        }
        return null;
    }
    attrSetProperty(key: string, property: string, attr: any) {
        let p = this.properyHas(property) ? this.properyGet(property) : this.properyCreate(property);
        let attrs = p.attr || (p.attr = {});
        if (key in attrs) {
            new Error(`already defined property attr. key="${key}"; property="${property}"`);
        }
        attrs[key] = attr;
        return this;
    }
    attrGetProperty(key: string, propery: string) {
        if (this.properyHas(propery)) {
            let p = this.properyGet(propery);
            if (p.attr && key in p.attr) {
                return p.attr[key];
            }
            return null;
        }
        throw new Error(`not found propery. propery=${propery};`)
    }

    attrSetMethod(key: string, method: string, attr: any) {
        let m = this.methodHas(method) ? this.methodGet(method) : this.methodCreate(method);
        let attrs = m.attr || (m.attr = {});
        if (key in attrs) {
            new Error(`already defined method attr. key="${key}"; method="${method}"`);
        }
        attrs[key] = attr;
        return this;
    }
    attrGetMethod(key: string, method: string) {
        if (this.methodHas(method)) {
            let m = this.methodGet(method);
            if (m.attr && key in m.attr) {
                return m.attr[key];
            }
            return null;
        }
        throw new Error(`not found method. method=${method};`)
    }

    attrSetArgument(key: string, method: string, index: number, attr: any) {
        let a = this.argumentHas(method, index) ? this.argumentGet(method, index) : this.argumentCreate(method, index);
        let attrs = a.attr || (a.attr = {});
        if (key in attrs) {
            new Error(`already defined argument attr. key="${key}"; method="${method}"; index=${index}`);
        }
        attrs[key] = attr;
        return this;
    }

    attrGetArguments(key: string, method: string, index: number) {
        if (this.argumentHas(method, index)) {
            let a = this.argumentGet(method, index);
            if (a.attr && key in a.attr) {
                return a.attr[key];
            }
            return null;
        }
        throw new Error(`not found argument. method=${method}; index=${index}`)
    }
}
