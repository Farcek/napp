import { AHandler } from "@napp/api-server";

import { metaUserPut } from "test/meta.user.put";
import { jsonBodyparser } from "./parser";


export default new AHandler(metaUserPut.meta, {
    befores: [jsonBodyparser()],
    validation: async ({ b: body }) => {
        if (body.name == "error") {
            throw new Error('this error')
        }
    },

    action: async (pram) => {
        let res: metaUserPut.Resp = {
            body: pram.b,
            path: pram.p,
            query: pram.q
        };

        return res
    }
});