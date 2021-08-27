import { Exception } from './exception';

export class ValidationException extends Exception {
    constructor(message: string) {
        super('validation', message);
    }
}


// export class ValidationPropertiesException extends Exception {
//     errors: Record<string, Exception[]> = {};
//     constructor(message: string) {
//         super('validation-properties', message);
//     }

//     addError(property: string, error: Exception) {
//         if (property in this.errors) {
//             this.errors[property].push(error);
//         } else {
//             this.errors[property] = [error];
//         }
//         return this;
//     }

//     hasError() {
//         let keys = Object.keys(this.errors);
//         for (let it of keys) {
//             let p = this.errors[it];
//             if (p.length > 0) {
//                 return true
//             }
//         }
//         return false
//     }

//     hasErrorProperies(name: string) {
//         if (name in this.errors) {
//             return this.errors[name].length > 0
//         }
//         return false;
//     }



//     getProperies() {
//         return Object.keys(this.errors)
//     }



//     getErrorsByAll() {
//         let errors: Exception[] = [];
//         Object.keys(this.errors).map(p => {
//             errors = [...errors, ...this.errors[p]];
//         })
//         return errors;
//     }
//     getErrorsByProperty(name: string) {
//         if (name in this.errors) {
//             return this.errors[name];
//         }
//         return [];
//     }

//     mapErrorByAll<T>(handle: (property: string, messages: Exception[]) => T) {
//         return Object.keys(this.errors)
//             .map((property) => handle(property, this.errors[property]));
//     }

//     mapErrorByPropery<T>(property: string, handle: (message: Exception) => T) {
//         if (property in this.errors) {
//             return this.errors[property].map((message) => handle(message))
//         }
//         return [];
//     }

//     toPlan() {
//         let pp = super.toPlan()
//         return {
//             ...pp,
//             errors: this.errors
//         }
//     }
// }