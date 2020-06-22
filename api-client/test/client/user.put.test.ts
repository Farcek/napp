import { clientModule } from "./provider";
import { metaHelloWorld } from "test/meta.helloworld";

import { suite, test, only } from "@testdeck/mocha";
import assert from "assert";
import { metaUserPut } from "test/meta.user.put";


let apiClient =  clientModule.factory(metaUserPut.meta)
    
;



@suite 
@only
export class UserPutTest{

    @test
    async basic() {
        let req =  apiClient({
            body : {age : 1, name: 'farcek'},
            path : {customer : 1, mode : metaUserPut.OrderMode.A , order : 'aa11' },
            query : {page : 1, sort_type : 'asc', sort_field : 'name'}

        })
        req.validate();
        let resp = await req.call();
        assert.equal(resp.body.name, 'farcek')
        assert.equal(resp.body.age, 1)
        assert.equal(resp.path.customer, 1)
        assert.equal(resp.path.mode, metaUserPut.OrderMode.A)
        assert.equal(resp.path.order, 'aa11')
        assert.equal(resp.query.page, 1)
        assert.equal(resp.query.sort_type, 'asc')
        assert.equal(resp.query.sort_field, 'name')
    }
}