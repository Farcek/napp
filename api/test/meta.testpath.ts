
import { AInterface } from '@napp/api-core'
export namespace metaTestpath {

    export interface Requ {
        a: string;
        b: number;

        c?: number
    }

    export interface Resp {
        ab: string
    }

    export const meta1: AInterface<Requ, Resp> = {
        name: 'testpath1',
        path: '/test-path1/:a',
        pipe: {
            fromHttp: (p) => {
                return {
                    a: p.path.a,
                    b: p.query.b ? parseInt(p.query.b) : 0,
                    c: p.query.c ? parseInt(p.query.c) : undefined
                };
            },
            toHttp: (p) => {
                return {
                    path: { a: p.a },
                    query: { b: '' + p.b, c: '' + p.c },
                }
            }
        }

    }
    export const meta2: AInterface<Requ, Resp> = {
        name: 'testpath2',
        path: '/test/path2/:b',
        method: 'delete',

        url : (p)=>`/test/path2/${p.b}?a=${p.a}&c=${p.c}`,

        pipe: {
            fromHttp: ({ query, path }) => {
                return {
                    a: query.a,
                    b: parseInt(path.b),
                    c: parseInt(query.c)
                }
            }           
        }
    }
}