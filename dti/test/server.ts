import { ServerAdapterFactory } from "@napp/dti-server/index";
import { Test01Dti } from "./dti";

const server = new ServerAdapterFactory((level, message) => console.log(level, message))

    ;


Test01Dti.server(server.adapter)
    .before([])
    .handle(async ({ category, filter }) => {
        let resp: Test01Dti.Resu = {
            category,
            total: 1,
            items: []
        };
        return resp;
    })




function setup() {
    // express router ; app
    let express: any = '';
    let app: any = '';

    server.addNativeRoute((route: any) => {
        route.get('/', (req: any, res: any) => {
            
        })
        return {
            name: 'test'
        }
    })

    app.user('/path', server.setup(express.router()))
}

