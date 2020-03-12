import 'reflect-metadata';
import { suite, test } from "mocha-typescript";

import { assert } from "chai";
import { Exception, ExceptionConvert } from "../src";


@suite
class ExceptionAction {
    @test
    async basic() {

        let e = new Exception("Exception","msg1");
        assert.equal(e.message, "msg1")
        assert.equal(e.name, "Exception")

    }
    @test
    async call1() {

        try {
            testMsg1();
        } catch (error) {

            let ex = ExceptionConvert(error);

            assert.instanceOf(ex, Exception);
            assert.equal(ex.message, "msg2");
        }
    }

}

function testMsg1() {
    throw new Exception("Exception","msg2")
}