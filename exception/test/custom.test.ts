import 'reflect-metadata';
import { suite, test } from "@testdeck/mocha";

import { assert } from "chai";
import { Exception } from "../src";

class MyError extends Exception {

    other: string;
    constructor(m: string, other: string) {
        super("MyError", m);
        this.other = other;
    }

    toPlan() {
        let obj = super.toPlan();
        return {
            ...obj,
            other: this.other
        }
    }
}



@suite
class CustomExceptionTest {
    @test
    async basic() {
        try {
            throw new MyError("custom1", "val1")
        } catch (error) {
            let err: MyError = error;
            assert.equal("MyError", err.name)
            assert.equal("custom1", err.message)
            assert.equal("val1", err.other)
        }
    }

    @test
    async convert() {
        let err = new MyError("custom1", "val1");

        let str = JSON.stringify(err);

        let obj = JSON.parse(str);

        let e1 = Exception.from(obj, (obj, param) => {
            if (param.name === 'MyError') {
                return new MyError(param.message, obj.other)
            }
            return false
        });



        if (e1 instanceof MyError) {
            assert.equal("MyError", e1.name)
            assert.equal("custom1", e1.message)
            assert.equal("val1", e1.other)
        } else {
            throw new Error('not working convert');
        }


    }


}

