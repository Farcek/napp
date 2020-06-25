import { AHandler } from "@napp/api-server";
import { metaError } from "test/meta.err";
import { jsonBodyparser } from "./parser";

export default new AHandler(metaError.meta, {
    befores : [jsonBodyparser()],
    validation : async (e)=>{
        if(e.name == 'server') {
            throw Error('Server error')
        }
    },
    action: async (p) => {
        return {
            message: `hi ${p.name}`
        }
    }
});