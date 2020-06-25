import { clientModule } from "./provider";

import { suite, test, only } from "@testdeck/mocha";
import assert from "assert";


import { metaError } from "test/meta.err";


let api = clientModule.factory(metaError.meta)



@suite
export class TestErrorClass {

    @test
    async basic() {
        let res = await api({ name : 'farcek' }).call();
            assert.equal(res.message, 'hi farcek')

        try {
            let res = await api({ name : 'client' }).call();
            
            throw new Error('no no. client')

        } catch (error) {
            assert.ok(error.error)
            assert.equal(error.message, 'client error')            
        }
        
        try {
            let res = await api({ name : 'server' }).call();
            
            throw new Error('no no. server')

        } catch (error) {
            assert.ok(error.error)
            assert.equal(error.message, 'Server error')            
        }
        
        
    }

    
}