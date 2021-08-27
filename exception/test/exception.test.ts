import 'reflect-metadata';
import { suite, test } from "@testdeck/mocha";

import { assert } from "chai";
import { Exception } from "../src";


@suite
class ExceptionAction {
    @test
    async basic() {

        let e = new Exception("Exception","msg1");
        assert.equal(e.message, "msg1")
        assert.equal(e.name, "Exception")

    }
    

    @test
    async basicConver() {

        let e = new Exception("Err1","msg1");

        let str =  JSON.stringify(e);

        let e1 = Exception.from(JSON.parse(str));

        assert.equal(e.message, e1.message)
        assert.equal(e.name, e1.name)

    }
}

