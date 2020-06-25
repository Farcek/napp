import { AInterface } from '@napp/api-core'
export namespace metaError {

    export interface Requ {
        name:string
    }
    
    export interface Resp {
        message: string
    }

    export const meta: AInterface<Requ,Resp> = {
        name: 'error',
        method :'post',
        validation : (p)=>{
            if(!p.name) {
                throw new Error('name is requared')
            }
            if(p.name == 'client') {
                throw new Error('client error')
            }
        }
    }
}