

export namespace UserList {
    export const name = 'user-list';
    export const method = 'get';
    export const path = `/${name}`;

    export namespace Req {
        export interface PParam {
            id: string
        }
        export interface BParam {
            name: string;
            age: number;
        }
        export interface QParam {

        }
    }

    export namespace Res {
        export interface Item {

        }

        export interface Result {

            total: number;
            items: Item[]
        }
    }
}

interface IRegisterOption {

}
interface IAction<REQ, RES> {
    (param: REQ): Promise<RES>
}
interface IValidation<REQ> {
    (param: REQ): Promise<void>
}
export class Register<REQ, RES> {
    action(handle: IAction<REQ, RES>) {
        return this;
    }

    validation(handle: IValidation<REQ>) {
        return this;
    }
}

class Module {
    register<REQ, RES>(): Register<REQ, RES> {
        return new Register<REQ, RES>()
    }
}

const m = new Module();

m.register<UserList.Req.BParam, UserList.Res.Result>(  )
    .validation(async (param) => {

    })
    .action(async (param) => {
        return {
            total: 1,
            items: [] as any
        }
    })
    ;