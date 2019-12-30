import { RestAPI } from "./index";

namespace client {
    export function factoryClient<RQ, RS>(Cls: RestAPI<RQ, RS>) {
        return async (rq: RQ) => {
            let rs: RS = {} as any;
            return rs;
        };
    }

}

namespace server {

    export class ServerHandl<RQ, RS>{
        constructor(private Cls: RestAPI<RQ, RS>) {

        }
        action(handle: (rq: RQ) => Promise<RS>) {

        }
    }

    export function factory<RQ, RS>(Cls: RestAPI<RQ, RS>) {
        return new ServerHandl<RQ, RS>(Cls);
    }
}

namespace test {
    export class RQ1 {
        name: string = '';
        age: string = '';
    }
    export class RS1 {
        flag: boolean = false;
    }

    const api1 = new RestAPI("api2", RQ1, RS1).setMethod('POST');


    //export class API1 extends BASEAPI<RQ1, RS1>{ };



    async function tClient() {
        const a = client.factoryClient(api1);
        let rs = await a({ age: "1", name: "" });
    }

    function tServer() {
        let router = "" as any;

        




        server
            .factory(api1)
            .action(async (rq) => {
                return 1 as any;
            });


    }


}









