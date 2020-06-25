
import { AInterface } from '@napp/api-core'
export namespace metaHelloWorld {

    export interface Requ {
    }
    
    export interface Resp {
        message: string
    }

    export const meta: AInterface<Requ,Resp> = {
        name: 'helloworld'
    }
}