import { ServerAdapterFactory } from "@napp/dti-server/index";
import { Test01Dti } from "./dti";

const server = new ServerAdapterFactory()

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



    app.user('/path', server.setup(express.router()))
}

