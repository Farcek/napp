import { Dti } from "@napp/dti-core";


export namespace Test01Dti {

    export interface By {
        id: string;
    }

    export interface Body {
        name: string;
        age: number;
    }


    export interface Resu {
        flag: string;
        message: string;
    }


    export const meta = Dti.define<Resu, By, Body>({
        name: 'update',
        checkQ: (q) => {
            if (q.id || '' === '') {
                throw new Error('id is reqyared')
            }
        },
        checkB: (b) => {
            if (b.name || '' === '') {
                throw new Error('name is reqyared')
            }
            if ((b.age > 0 && b.age < 150) === false) {
                throw new Error('check age value')
            }
        }
    })
}