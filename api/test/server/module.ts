import { AModule } from "@napp/api-server";
import helloworld from "./helloworld";
import userPut from "./user.put";
import {testPath1,testPath2} from "./test.path";
import testError from "./test.error";


let m = new AModule('test-module', {
    logger: (name, dta) => {
        console.log(name, dta)
    },
    errorHandle: (err) => {

        return err;

        // res.status(500).json({
        //     error:true,
        //     message: err.message
        // })
    }
});


m.register(helloworld);
m.register(userPut);

m.register(testPath1);
m.register(testPath2);
m.register(testError);


export const module = m;