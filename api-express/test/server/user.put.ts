import { AHandler } from "src/server.lib";

import { metaUserPut } from "test/meta.user.put";
import { jsonBodyparser } from "./parser";
import { params } from "@testdeck/mocha";

export default new AHandler(metaUserPut.meta, {
    befores: [jsonBodyparser()],
    validation : async (p)=>{
        if(p.body?.name == "error") {
            throw new Error('this error')
        }
    },
    action: async (pram) => {
        let body = pram.body;
        
        return pram
    }
});