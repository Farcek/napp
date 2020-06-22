
import { AInterface } from 'src/core'
export namespace metaHelloWorld {

    
    
    export interface Resp {
        message: string
    }

    export const meta: AInterface<Resp> = {
        name: 'helloworld',
        method: 'get'
    }
}