import 'reflect-metadata';
import { suite, test } from "mocha-typescript";

import { assert } from "chai";
import { ValidationFormException, ExceptionConvert } from "../src";


@suite
class PropertiesExceptionTest {
    @test
    async basic() {

        let e = new ValidationFormException("check properties", {
            name: ["emoty", "low text"]
        });
        assert.equal(e.message, "check properties")
        assert.deepEqual(e.getPropertyMessages('name'), ["emoty", "low text"])

    }
    @test
    async conver1() {

        try {
            let e = new ValidationFormException();
            e.addPropertyMessage("name", "empty");

            throw e.toJson();
        } catch (error) {

            let ex = ExceptionConvert(error) as ValidationFormException;

            assert.instanceOf(ex, ValidationFormException);
            let c = ex.map((p, m) => ({ [p]: m.join() }));
            assert.deepEqual(c, [{ name: 'empty' }]);

            let c2 = ex.mapPropery('name', (msg) => ': ' + msg);
            assert.deepEqual(c2, [': empty']);
        }
    }

}

