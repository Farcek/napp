
import { OpenAPIV3 } from "openapi-types";


import { Project, ScriptTarget, VariableDeclarationKind, InterfaceDeclaration, NamespaceDeclaration, ts, printNode, WriterFunction, CodeBlockWriter, SourceFile } from "ts-morph";
import { ApiEndpoint, updateSchema, ApiModel } from "./common";
import { OpenAPIV3Parser } from "./parser";
import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const jsConvert = require('js-convert-case');

export interface OApiBuilder {
    file: string;


    outDir: string;
    namespace?: string
}
export class ApiBuilder {

    components: OpenAPIV3.ComponentsObject;
    endpoints: ApiEndpoint[];
    apiDocument: OpenAPIV3.Document;

    project = new Project({
        compilerOptions: {
            // useInMemoryFileSystem: true
        }
    });

    constructor(private opt: OApiBuilder) {
        let jsonStr = readFileSync(this.opt.file).toString();
        let json: OpenAPIV3.Document = this.apiDocument = JSON.parse(jsonStr);
        let { components, endpoints } = new OpenAPIV3Parser(json).parse();
        this.components = components;
        this.endpoints = endpoints;
    }

    buildComponents() {
        let src = this.project.createSourceFile(pathJoin(this.opt.outDir, 'components.ts'), undefined, { overwrite: true });
        {
            let nsComponents = src.addNamespace({
                name: "Components",
                isExported: true
            });

            let schemas = this.components.schemas || {};
            for (let k of Object.keys(schemas)) {

                let iSchema = nsComponents.addInterface({
                    name: k,
                    isExported: true
                });

                updateSchema(iSchema, schemas[k])
            }
        }


        return this;
    }

    buildEndponts(hasNappApi: boolean) {
        let src = this.project.createSourceFile(pathJoin(this.opt.outDir, 'endpoints.ts'), undefined, { overwrite: true });
        src.addImportDeclaration({
            namedImports: ["AInterface", "HttpParam"],
            moduleSpecifier: "@napp/api-core",
            // moduleSpecifier: "../core",
        });
        src.addImportDeclaration({
            namedImports: ["Components"],
            moduleSpecifier: "./components",
        });

        let nsContiner = src.addNamespace({
            name: this.opt.namespace || 'nappi',
            isExported: true
        });

        for (let it of this.endpoints) {
            this.buildEndpoint(nsContiner, it, hasNappApi)
        }

        return this;
    }


    save() {
        this.project.save()
    }

    private buildEndpoint(nsContiner: NamespaceDeclaration, endpoint: ApiEndpoint, hasNappApi: boolean) {

        let namespace = nsContiner.addNamespace({
            name: endpoint.name,
            isExported: true
        });


        let iRequ = namespace.addInterface({
            name: `Requ`, isExported: true
        });
        let iPath: { intr: InterfaceDeclaration, multi: boolean } | undefined = undefined;
        let iQuery: { intr: InterfaceDeclaration, multi: boolean } | undefined = undefined;
        let iBody: { intr: InterfaceDeclaration, multi: boolean } | undefined = undefined;

        { // request

            if (endpoint.isMultParam) {
                if (endpoint.paramPath) {
                    let intr = namespace.addInterface({
                        name: `ParamPath`, isExported: true
                    });
                    endpoint.paramPath.build(intr);
                    iRequ.addProperty({ name: 'path', type: 'ParamPath' });

                    iPath = { intr, multi: true };
                }
                if (endpoint.paramQuery) {
                    let intr = namespace.addInterface({
                        name: `ParamQuery`, isExported: true
                    });
                    endpoint.paramQuery.build(intr);
                    iRequ.addProperty({ name: 'query', type: 'ParamQuery' });
                    iQuery = { intr, multi: true };
                }
                // if (endpoint.paramHeader) {
                //     let iHeader = namespace.addInterface({
                //         name: `ParamHeader`, isExported: true
                //     });
                //     endpoint.paramHeader.build(iHeader);
                //     iRequ.addProperty({ name: 'header', type: 'ParamHeader' })
                // }
                if (endpoint.paramBody) {
                    let intr = namespace.addInterface({
                        name: `ParamBody`, isExported: true
                    });
                    endpoint.paramBody.build(intr);
                    iRequ.addProperty({ name: 'body', type: 'ParamBody' })

                    iBody = { intr, multi: true };
                }


            } else {
                if (endpoint.paramBody) {
                    endpoint.paramBody.build(iRequ);
                    iBody = { intr: iRequ, multi: true };
                }
                if (endpoint.paramPath) {
                    endpoint.paramPath.build(iRequ);
                    iPath = { intr: iRequ, multi: false };
                }
                if (endpoint.paramQuery) {
                    endpoint.paramQuery.build(iRequ);
                    iQuery = { intr: iRequ, multi: false };
                }

                // if (endpoint.paramHeader) {
                //     endpoint.paramHeader.build(iRequ);
                // }
            }
        }

        {// resp
            let iResp = namespace.addInterface({
                name: `Resp`, isExported: true
            });

            if (endpoint.response) {
                endpoint.response.build(iResp)
            }
        }

        if (hasNappApi) {
            namespace.addVariableStatement({
                declarationKind: VariableDeclarationKind.Const,
                declarations: [
                    {
                        name: 'meta',
                        type: 'AInterface<Requ, Resp>',

                        initializer: (w) => w.block(() => {
                            w.writeLine(`name : "${endpoint.name}",`)
                            w.writeLine(`method : "${endpoint.method}",`)

                            { // path
                                if (iPath) {
                                    let path = endpoint.path;
                                    for (let p of iPath.intr.getProperties()) {
                                        let n = p.getName();
                                        path = path.replace(`{${n}}`, `:${n}`)
                                    }
                                    w.writeLine(`path : "${path}",`)
                                } else {
                                    w.writeLine(`path : "${endpoint.path}",`)
                                }
                            }

                            { // url
                                let url: string = '';
                                if (iPath) {
                                    let path = endpoint.path;

                                    for (let p of iPath.intr.getProperties()) {
                                        let v = iPath.multi ? `req.path.${p.getName()}` : `req.${p.getName()}`;
                                        path = path.replace(`{${p.getName()}}`, '${' + v + '}')
                                    }

                                    url = path;
                                }

                                if (iQuery) {
                                    let qstr = url || endpoint.path;

                                    let qPart = [];

                                    for (let p of iQuery.intr.getProperties()) {
                                        let v = iQuery.multi ? `req.query.${p.getName()}` : `req.${p.getName()}`;
                                        qPart.push(`${p.getName()}=` + '${' + v + '}');
                                    }
                                    url = qstr + '?' + qPart.join('&');
                                }


                                if (url) {
                                    w.writeLine(`url : (req:Requ) => \`${url}\`,`)
                                }
                            }

                            if (iBody || iPath || iQuery) {
                                w.write('pipe:').block(() => {
                                    w.write('fromHttp:').write(`(http:HttpParam) =>`).block(() => {
                                        if (endpoint.isMultParam) {
                                            let params: string[] = [];
                                            if (iBody) {
                                                w.writeLine('let body:ParamBody = http.body as any;');
                                                params.push('body');
                                            }
                                            if (iQuery) {
                                                w.writeLine('let query:ParamQuery = http.query as any;');
                                                params.push('query');
                                            }
                                            if (iPath) {
                                                w.writeLine('let path:ParamPath = http.path as any;');
                                                params.push('path');
                                            }
                                            w.writeLine(`return { ${params.join(', ')} }`)
                                        } else {
                                            if (iBody) {
                                                w.writeLine('return http.body as any');
                                            }
                                            if (iQuery) {
                                                w.writeLine('return http.query as any');
                                            }
                                            if (iPath) {
                                                w.writeLine('return http.path as any');
                                            }
                                        }
                                    });
                                    w.writeLine(',');
                                    w.write('toHttp:').write('(req: Requ) =>').block(() => {
                                        if (endpoint.isMultParam) {
                                            w.write('return ').block(() => {
                                                if (iBody) {
                                                    w.writeLine('body: req.body as any,');
                                                }
                                                if (iQuery) {
                                                    w.writeLine('query: req.query as any,');
                                                }
                                                if (iPath) {
                                                    w.writeLine('path: req.path as any,');
                                                }
                                            })
                                        } else {
                                            if (iBody) {
                                                w.writeLine('return {body : req  as any};');
                                            }
                                            if (iQuery) {
                                                w.writeLine('return {query : req  as any};');
                                            }
                                            if (iPath) {
                                                w.writeLine('return {path : req as any};');
                                            }
                                        }
                                    });
                                })
                            }
                        })
                    }
                ],
                docs: [
                    `${endpoint.schemaOperation.summary || endpoint.schemaOperation.operationId}`,
                    `${endpoint.schemaOperation.description}`,
                    `path: ${endpoint.path}`
                ],
                isExported: true
            });
        }
    }
}

