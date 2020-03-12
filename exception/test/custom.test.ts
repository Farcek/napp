import 'reflect-metadata';
import { suite, test } from "mocha-typescript";

import { assert } from "chai";
import { NotFoundException, ExceptionConvert, Exception } from "../src";

class MyError extends Exception {
    constructor(m: string) {
        super("MyError", m);

    }


}



@suite
class CustomExceptionTest {
    @test
    async basic() {
        try {
            throw new MyError("custom1")
        } catch (error) {
            let err: MyError = error;
            assert.equal("MyError", err.name)
            assert.equal("custom1", err.message)
        }
    }

    @test
    async convert() {
        try {
            throw new MyError("custom2")
        } catch (error) {
            let err = ExceptionConvert(error);

            assert.instanceOf(err, MyError);
            assert.equal("MyError", err.name)
            assert.equal("custom2", err.message)
        }
    }

    @test
    async convert2() {
        let src = new MyError("custom3").toJson();
        let err = ExceptionConvert(src) ;

        assert.instanceOf(err, Exception);
        assert.equal("MyError", err.name)
        assert.equal("custom3", err.message)
    }
}

