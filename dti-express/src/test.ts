import { RestAPI } from "@napp/dti";
import { ExpressService } from "./index";

const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req: any, res: any) => res.send('Hello World!'));

namespace aa {
    export class RQ1 {
        name: string = '';
        age: string = '';
    }
    export class RS1 {
        flag: boolean = false;
    }

    export const api = new RestAPI("api2", RQ1, RS1);


}


const ss = new ExpressService(app);

ss
    .factory(aa.api)
    .befores()
    .action(async (rq,req) => {
        console.log('call okk');
        return {
            flag : false
        };
    });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));










// namespace test {



//     //export class API1 extends BASEAPI<RQ1, RS1>{ };



//     async function tClient() {
//         const a = client.factoryClient(api1);
//         let rs = await a({ age: "1", name: "" });
//     }

//     function tServer() {
//         let router = "" as any;






//         server
//             .factory(api1)
//             .action(async (rq) => {
//                 return 1 as any;
//             });


//     }


// }


