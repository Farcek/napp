import { AHandler } from "src/server.lib";
import { metaHelloWorld } from "test/meta.helloworld";

export default new AHandler(metaHelloWorld.meta, {
    action: async ({ body }) => {
        return {
            message: `hello world`
        }
    }
});