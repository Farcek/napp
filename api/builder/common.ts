import { OpenAPIV3 } from "openapi-types";
import { InterfaceDeclaration, CodeBlockWriter } from "ts-morph";
const jsConvert = require('js-convert-case');

export function updateSchema(intr: InterfaceDeclaration, schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject) {
    if ((schema as OpenAPIV3.ReferenceObject).$ref) {
        let ref = (schema as OpenAPIV3.ReferenceObject).$ref;
        if (ref.startsWith('#/components/schemas/')) {
            let name = ref.substr('#/components/schemas/'.length);
            return intr.addExtends(`Components.${name}`)
        }
        return
    }

    let _arr = schema as OpenAPIV3.ArraySchemaObject
    if (_arr.type && _arr.items) {
        let type = buildType(_arr.items);

        return intr.addExtends(`Array<${type}>`)
    }



    let _obj = schema as OpenAPIV3.NonArraySchemaObject
    if (_obj.type == 'boolean') return intr.addExtends(`Boolean`)
    if (_obj.type == 'integer') return intr.addExtends(`Number`)
    if (_obj.type == 'number') return intr.addExtends(`Number`)

    if (_obj.type == 'string') return intr.addExtends(`String`)

    if (_obj.type == 'object') {

        if (_obj.properties) {
            let keys = Object.keys(_obj.properties);
            for (let k of keys) {
                let p = _obj.properties[k];
                let hasQuestionToken = !(_obj.required && _obj.required.indexOf(k) >= 0);
                let type = buildType(p);
                intr.addProperty({ name: k, type, hasQuestionToken })
            }
        }
    }

}

export function buildType(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): string {
    if ((schema as OpenAPIV3.ReferenceObject).$ref) {
        let ref = (schema as OpenAPIV3.ReferenceObject).$ref;
        if (ref.startsWith('#/components/schemas/')) {
            let name = ref.substr('#/components/schemas/'.length);
            return `Components.${name}`
        }
        return 'undefined'
        // return (schema as OpenAPIV3.ReferenceObject).$ref;
    }


    let _arr = schema as OpenAPIV3.ArraySchemaObject
    if (_arr.type && _arr.items) {
        let type = buildType(_arr.items);
        return type + `[]`
    }



    let _obj = schema as OpenAPIV3.NonArraySchemaObject
    if (_obj.type == 'boolean') return 'boolean';
    if (_obj.type == 'integer') return 'number';
    if (_obj.type == 'number') return 'number';

    if (_obj.type == 'string') return 'string';


    if (_obj.type == 'object') {

        let writer = new CodeBlockWriter();

        writer.block(() => {
            if (_obj.properties) {
                let keys = Object.keys(_obj.properties);
                for (let k of keys) {
                    let p = _obj.properties[k];
                    let hasQuestionToken = !(_obj.required && _obj.required.indexOf(k) >= 0);

                    let type = buildType(p);
                    writer.writeLine(`${k}${hasQuestionToken ? '?' : ''} : ${type},`)
                }
            }
        })

        return writer.toString();
    }

    return 'null'
}

export class ApiModel {
    constructor(public schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject) {

    }

    build(intr: InterfaceDeclaration) {
        updateSchema(intr, this.schema)

    }
}


export class ApiEndpoint {

    name: string;
    isMultParam = false
    constructor(
        public method: string,
        public path: string,

        public schemaOperation: OpenAPIV3.OperationObject,
    ) {

        this.name = jsConvert.toPascalCase(schemaOperation.operationId);
    }

    paramPath?: ApiModel;
    paramQuery?: ApiModel

    paramBody?: ApiModel;
    response?: ApiModel;

    updateIsMultParam() {
        let s = this.paramBody ? 1 : 0;
        s += this.paramPath ? 1 : 0;
        s += this.paramQuery ? 1 : 0;
        // s += endpoint.paramHeader ? 1 : 0;

        this.isMultParam = s > 1;
    }
}