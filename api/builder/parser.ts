import { OpenAPIV3 } from "openapi-types";
import { ApiEndpoint, ApiModel } from "./common";




export class OpenAPIV3Parser {

    // json: OpenAPIV3.Document;

    constructor(private json: OpenAPIV3.Document) {

    }

    parse() {

        let endpoints = this.schemaByPathsObject(this.json.paths);

        return {
            endpoints,
            components: this.json.components || {}
        }
    }

    private schemaByPathsObject(paths: OpenAPIV3.PathsObject): ApiEndpoint[] {
        let endpoints: ApiEndpoint[] = [];
        for (let path in paths) {
            // let pathName = jsConvert.toPascalCase(path);
            let item = paths[path];
            let _schemas = this.schemaByPathItemObject({ path }, item);
            endpoints = [...endpoints, ..._schemas];
        }
        return endpoints;
    }



    private schemaByParams(type: 'path' | 'query' | 'header', params: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[]): ApiModel | null {

        let schema: OpenAPIV3.NonArraySchemaObject = {
            type: 'object',
            properties: {},
            required: []
        };

        let has = false;

        for (let f of params) {
            let r = f as OpenAPIV3.ReferenceObject;
            if (r.$ref) continue;

            let p = f as OpenAPIV3.ParameterObject;
            if (p.in == type && schema.required && schema.properties && p.schema) {
                has = true;
                if (p.required) {
                    schema.required.push(p.name)
                }
                schema.properties[p.name] = p.schema;
                if(! (p.schema as OpenAPIV3.ReferenceObject).$ref){
                    (schema.properties[p.name] as OpenAPIV3.NonArraySchemaObject).description = p.description
                }
                
            }
        }

        if (has) {
            return new ApiModel(schema)
        }

        return null;

    }

    private schemaByPathItemObject(info: { path: string }, pathItem: OpenAPIV3.PathItemObject): ApiEndpoint[] {
        let schemas: ApiEndpoint[] = [];

        let paramPath: ApiModel | undefined = undefined;

        if (pathItem.parameters) {
            paramPath = this.schemaByParams('path', pathItem.parameters) || undefined
        }



        if (pathItem.get) {
            let _schemas = this.schemaByOperationObject({ ...info, method: 'get' }, pathItem.get, paramPath);
            if (_schemas) schemas.push(_schemas);
        }
        if (pathItem.put) {
            let _schemas = this.schemaByOperationObject({ ...info, method: 'put' }, pathItem.put, paramPath);
            if (_schemas) schemas.push(_schemas);
        }
        if (pathItem.post) {
            let _schemas = this.schemaByOperationObject({ ...info, method: 'post' }, pathItem.post, paramPath);
            if (_schemas) schemas.push(_schemas);
        }
        if (pathItem.delete) {
            let _schemas = this.schemaByOperationObject({ ...info, method: 'delete' }, pathItem.delete, paramPath);
            if (_schemas) schemas.push(_schemas);
        }
        if (pathItem.options) {
            let _schemas = this.schemaByOperationObject({ ...info, method: 'options' }, pathItem.options, paramPath);
            if (_schemas) schemas.push(_schemas);
        }
        if (pathItem.head) {
            let _schemas = this.schemaByOperationObject({ ...info, method: 'head' }, pathItem.head, paramPath);
            if (_schemas) schemas.push(_schemas);
        }
        if (pathItem.patch) {
            let _schemas = this.schemaByOperationObject({ ...info, method: 'patch' }, pathItem.patch, paramPath);
            if (_schemas) schemas.push(_schemas);
        }
        if (pathItem.trace) {
            let _schemas = this.schemaByOperationObject({ ...info, method: 'trace' }, pathItem.trace, paramPath);
            if (_schemas) schemas.push(_schemas);
        }
        return schemas
    }


    private schemaByOperationObject(info: { method: string, path: string }, oprationObject: OpenAPIV3.OperationObject, paramPath?: ApiModel): ApiEndpoint | null {
        if (oprationObject.operationId) {


            let endpoint = new ApiEndpoint(info.method, info.path, oprationObject);

            endpoint.paramPath = paramPath;

            if(oprationObject.tags && Array.isArray(oprationObject.tags) && oprationObject.tags.length >0){
                endpoint.tags = oprationObject.tags;
            }

            if (oprationObject.responses) {
                endpoint.response = this.schemaByResponsesObject({ ...info, scope: 'resp' }, oprationObject.responses) || undefined;
            }
            if (oprationObject.requestBody) {
                endpoint.paramBody = this.schemaByRequestBodyObject(info, oprationObject.requestBody) || undefined
            }



            if (oprationObject.parameters) {
                endpoint.paramQuery = this.schemaByParams('query', oprationObject.parameters) || undefined;
                // endpoint.paramHeader = this.schemaByParams('header', oprationObject.parameters) || undefined;

            }

            endpoint.updateIsMultParam();

            return endpoint;
        }else {
            console.warn("ignore operation. not found operationId ", info)
        }

        return null;
    }



    private schemaByResponsesObject(info: {}, responses: OpenAPIV3.ResponsesObject): ApiModel | null {

        if (responses) {
            {
                let code = '200';
                if (code in responses) {
                    let responseObj = responses[code];
                    return this.schemaByResponseObject({ ...info, code }, responseObj);
                }
            }
            {
                let code = '201';
                if (code in responses) {
                    let responseObj = responses[code];
                    return this.schemaByResponseObject({ ...info, code }, responseObj);
                }
            }
            {
                let codes = Object.keys(responses);
                for (let code of codes) {
                    let responseObj = responses[code];

                    return this.schemaByResponseObject({ ...info, code }, responseObj);
                }
            }
        }
        return null;
    }
    private schemaByResponseObject(info: {}, response: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject): ApiModel | null {
        if (response) {
            if ((response as OpenAPIV3.ReferenceObject).$ref) {
                return this.schemaByResponseObject1(info, response as OpenAPIV3.ReferenceObject);
            }

            if ((response as OpenAPIV3.ResponseObject).content) {
                return this.schemaByResponseObject2(info, response as OpenAPIV3.ResponseObject);

            }
        }
        return null;
    }
    private schemaByResponseObject1(info: {}, response: OpenAPIV3.ReferenceObject): ApiModel | null {
        return new ApiModel(response);
    }
    private schemaByResponseObject2(info: {}, response: OpenAPIV3.ResponseObject): ApiModel | null {

        if (response && response.content) {
            let mediaType = 'application/json';
            if (mediaType in response.content) {
                let mediaTypeObject = response.content[mediaType];
                return this.schemaByMediaTypeObject({ ...info, mediaType }, mediaTypeObject);

            }

            let mediaTypes = Object.keys(response.content);
            for (let mediaType of mediaTypes) {
                let mediaTypeObject = response.content[mediaType];
                return this.schemaByMediaTypeObject({ ...info, mediaType }, mediaTypeObject);

            }
        }
        return null;
    }

    private schemaByRequestBodyObject(info: {}, requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject): ApiModel | null {
        if ((requestBody as OpenAPIV3.ReferenceObject).$ref) {
            return this.schemaByRequestBodyObject1(info, requestBody as OpenAPIV3.ReferenceObject);
        }
        if ((requestBody as OpenAPIV3.RequestBodyObject).content) {
            return this.schemaByRequestBodyObject2(info, requestBody as OpenAPIV3.RequestBodyObject);
        }
        return null
    }
    private schemaByRequestBodyObject1(info: {}, requestBody: OpenAPIV3.ReferenceObject): ApiModel | null {

        return new ApiModel(requestBody)
    }
    private schemaByRequestBodyObject2(info: {}, requestBody: OpenAPIV3.RequestBodyObject): ApiModel | null {
        if (requestBody.content) {
            let mediaType = 'application/json';
            if (mediaType in requestBody.content) {
                let mediaTypeObject = requestBody.content[mediaType];
                return this.schemaByMediaTypeObject({ ...info, mediaType }, mediaTypeObject);



            }
            let mediaTypes = Object.keys(requestBody.content);
            for (let mediaType of mediaTypes) {
                let mediaTypeObject = requestBody.content[mediaType];
                return this.schemaByMediaTypeObject({ ...info, mediaType }, mediaTypeObject);

            }
        }
        return null
    }
    private schemaByMediaTypeObject(info: {}, mediaTypeObject: OpenAPIV3.MediaTypeObject): ApiModel | null {
        if (mediaTypeObject.schema) {
            return new ApiModel(mediaTypeObject.schema);
        }
        return null;
    }

}