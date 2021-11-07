import { ServerAdapter } from "@napp/dti-server/index";
import { Test01Dti } from "./dti";

const server = new ServerAdapter((level, message) => console.log(level, message))

    ;


let ins = ServerAdapter.dti(Test01Dti.meta)
    .handle(async ({ q, b }, { }) => {





        return { flag: q.id, message: `${b.name}; ${b.age}` }
    })


server.register(ins)



function setup() {
    // express router ; app
    let express: any = '';
    let app: any = '';

    server.setup((route: any) => {
        route.get('/', (req: any, res: any) => {

        })
        return {
            name: 'test'
        }
    })

    app.user('/test1', server.setup(express.router()))
}

