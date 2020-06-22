import { AModule } from "src/server.lib";
import helloworld from "./helloworld";
import userPut from "./user.put";


let m = new AModule('test-module', {
    logger: (name, dta) => {
        console.log(name, dta)
    },
    errorHandle: (err, req, res, next) => {
        res.status(500).json({
            error:true,
            message: err.message
        })
    }
});


m.register(helloworld);
m.register(userPut);


export const module = m;


