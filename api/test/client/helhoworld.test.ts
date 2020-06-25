import { clientModule } from "./provider";
import { metaHelloWorld } from "test/meta.helloworld";

import { suite, test, only } from "@testdeck/mocha";
import assert from "assert";


let apiHelloWorld = clientModule.factory(metaHelloWorld.meta);



@suite
export class HelloWorld {

    @test
    async basic() {
        let req = apiHelloWorld({})
        req.validate();
        let resp = await req.call();
        console.log('resp', resp)
        assert.ok(resp.message, 'basic call')
    }
}