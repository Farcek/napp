import { OpenAPIV3 } from "openapi-types";
import { InterfaceDeclaration, CodeBlockWriter } from "ts-morph";
const jsConvert = require('js-convert-case');
export interface ILogger{
    (level:'info'|'warn'|'debug', message:string):void
}

export function nameConvert(names: string[]) {
    return jsConvert.toPascalCase(names.join(' '))
}

export function updateSchema(param: {
    arrItemObjectName: string,
    componentName: string,
    intr: InterfaceDeclaration,
    schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    logger : ILogger
}) {
    let { arrItemObjectName, intr, schema, componentName, logger } = param;
    if ((schema as OpenAPIV3.ReferenceObject).$ref) {
        let ref = (schema as OpenAPIV3.ReferenceObject).$ref;
        if (ref.startsWith('#/components/schemas/')) {
            let name = ref.substr('#/components/schemas/'.length);
            return intr.addExtends(`${componentName}.${name}`)
        }
        return
    }

    let _arr = schema as OpenAPIV3.ArraySchemaObject
    if (_arr.type && _arr.items) {
        
        if (_arr.description) {
            intr.addJsDoc(_arr.description);
        }
        let pName = nameConvert([arrItemObjectName, 'item']);
        let ns = intr.getParentNamespace();
        if (ns) {
            let pInter = ns.addInterface({
                name: pName, isExported: true
            });
            updateSchema({ arrItemObjectName: pName, intr: pInter, schema: _arr.items, componentName, logger });
            return intr.addExtends(`Array<${pName}>`)
        }
        let type = buildType(_arr.items, componentName);
        return intr.addExtends(`Array<${type}>`)
    }



    let _obj = schema as OpenAPIV3.NonArraySchemaObject

    if (_obj.description) {
        intr.addJsDoc(_obj.description);
    }

    if (_obj.type == 'boolean') return intr.addExtends(`Boolean`);
    if (_obj.type == 'integer') return intr.addExtends(`Number`);
    if (_obj.type == 'number') return intr.addExtends(`Number`);

    if (_obj.type == 'string') return intr.addExtends(`String`);

    if (_obj.type == 'object') {

        if (_obj.properties) {
            let keys = Object.keys(_obj.properties);
            for (let k of keys) {
                let p = _obj.properties[k];
                let hasQuestionToken = !(_obj.required && _obj.required.indexOf(k) >= 0);
                let type = buildType(p, componentName);

                // console.log('arrItemObjectName=', arrItemObjectName, 'componentName=' , componentName, `p=`, k, 'type=', type )

                let pp = intr.addProperty({ name: k, type, hasQuestionToken });

                let PP = (p as OpenAPIV3.NonArraySchemaObject);
                if (PP.description) {
                    pp.addJsDoc(PP.description);
                }

            }
        }
    }

}

export function buildType(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject, componentName: string): string {
    if ((schema as OpenAPIV3.ReferenceObject).$ref) {
        let ref = (schema as OpenAPIV3.ReferenceObject).$ref;
        if (ref.startsWith('#/components/schemas/')) {
            let name = ref.substr('#/components/schemas/'.length);
            return `${componentName}.${name}`
        }
        return 'undefined'
    }


    let _arr = schema as OpenAPIV3.ArraySchemaObject
    if (_arr.type && _arr.items) {
        let type = buildType(_arr.items, componentName);
        return type + `[]`
    }



    let _obj = schema as OpenAPIV3.NonArraySchemaObject
    if (_obj.type == 'boolean') return 'boolean';
    if (_obj.type == 'integer') return 'number';
    if (_obj.type == 'number') return 'number';

    if (_obj.type == 'string') {
        if (_obj.format == 'date' || _obj.format == 'time' || _obj.format == 'date-time') {
            return 'Date';
        }
        if (_obj.enum && _obj.enum.length > 0) {
            return `(${_obj.enum.map(it=>`'${it}'`).join(' | ')})`;
        }
        return 'string';
    }

    

    if (_obj.type == 'object') {

        let writer = new CodeBlockWriter();

        writer.block(() => {
            if (_obj.properties) {
                let keys = Object.keys(_obj.properties);
                for (let k of keys) {
                    let p = _obj.properties[k];
                    let hasQuestionToken = !(_obj.required && _obj.required.indexOf(k) >= 0);

                    let type = buildType(p, componentName);                    
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
}


export class ApiEndpoint {

    name: string;
    isMultParam = false
    constructor(
        public method: string,
        public path: string,

        public schemaOperation: OpenAPIV3.OperationObject,
    ) {

        this.name = nameConvert([schemaOperation.operationId || '']);
    }

    paramPath?: ApiModel;
    paramQuery?: ApiModel

    paramBody?: ApiModel;
    response?: ApiModel;

    tags?: string[];

    updateIsMultParam() {
        let s = this.paramBody ? 1 : 0;
        s += this.paramPath ? 1 : 0;
        s += this.paramQuery ? 1 : 0;
        // s += endpoint.paramHeader ? 1 : 0;

        this.isMultParam = s > 1;
    }
}