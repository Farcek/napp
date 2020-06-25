import { AHandler } from "@napp/api-server";
import { metaHelloWorld } from "test/meta.helloworld";

export default new AHandler(metaHelloWorld.meta, {
    action: async () => {
        return {
            message: `hello world`
        }
    }
});