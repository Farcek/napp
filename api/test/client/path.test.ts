import { clientModule } from "./provider";

import { suite, test, only } from "@testdeck/mocha";
import assert from "assert";


import { metaTestpath } from "test/meta.testpath";


let api1 = clientModule.factory(metaTestpath.meta1)
let api2 = clientModule.factory(metaTestpath.meta2)

@suite
export class PathTestClass {

    @test
    async basic() {
        let req = api1({ a: 'aa', b: 22, c: 1 })
        
        let resp = await req.call();
        console.log('resp 1', resp)
        assert.equal(resp.ab, 'r=aa-22-1');


        req = api1({ a: 'bb', b: 33, c: 2 })
        
        resp = await req.call();
        console.log('resp 2', resp)
        assert.equal(resp.ab, 'r=bb-33-2')
    }

    @test
    async basic1() {
        let req = api2({ a: 'aa', b: 22, c: 1 })
        
        let resp = await req.call();
        console.log('resp-2-1', resp)
        assert.equal(resp.ab, 'r=aa-22-1');


        
        resp = await api2({ a: 'bb', b: 33, c: 2 }).call();
        console.log('resp-2-1', resp)
        assert.equal(resp.ab, 'r=bb-33-2')
    }
}