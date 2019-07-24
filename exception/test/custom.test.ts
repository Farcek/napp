import 'reflect-metadata';
import { suite, test } from "mocha-typescript";

import { assert } from "chai";
import { NotFoundException, $$ExeptionNames, convertException, Exception, registerException } from "../src";

class MyError extends Exception {
    constructor(public a: string) {
        super("my error");
        Object.setPrototypeOf(this, MyError.prototype);
        super.name = 'MyError';
    }

    toJson() {
        return {
            name: this.name,
            message: this.message,
            a: this.a
        }
    }
}

registerException("MyError", (d) => new MyError(d.a))

@suite
class CustomExceptionTest {
    @test
    async basic() {
        try {
            throw new MyError("custom1")
        } catch (error) {
            let err: MyError = error;
            assert.equal("my error", err.message)
            assert.equal("MyError", err.name)
            assert.equal("custom1", err.a)
        }
    }

    @test
    async convert() {
        try {
            throw new MyError("custom2")
        } catch (error) {
            let err = convertException(error) as MyError;

            assert.instanceOf(err, MyError);
            assert.equal("my error", err.message)
            assert.equal("MyError", err.name)
            assert.equal("custom2", err.a)
        }
    }

    @test
    async convert2() {
        let src = new MyError("custom3").toJson();
        let err = convertException(src) as MyError;

        assert.instanceOf(err, MyError);
        assert.equal("my error", err.message)
        assert.equal("MyError", err.name)
        assert.equal("custom3", err.a)
    }
}

