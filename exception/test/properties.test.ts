import 'reflect-metadata';
import { suite, test } from "mocha-typescript";

import { assert } from "chai";
import { InvalidPropertiesException, convertException, $$ExeptionNames } from "../src";


@suite
class PropertiesExceptionTest {
    @test
    async basic() {

        let e = new InvalidPropertiesException("check properties", {
            name: ["emoty", "low text"]
        });
        assert.equal(e.message, "check properties")
        assert.equal(e.name, $$ExeptionNames.InvalidProperties)
        assert.deepEqual(e.getPropertyMessages('name'), ["emoty", "low text"])

    }
    @test
    async conver1() {

        try {
            let e = new InvalidPropertiesException();
            e.addPropertyMessage("name", "empty");

            throw e.toJson();
        } catch (error) {

            let ex = convertException(error) as InvalidPropertiesException;

            assert.instanceOf(ex, InvalidPropertiesException);
            let c = ex.map((p, m) => ({ [p]: m.join() }));
            assert.deepEqual(c, [{ name: 'empty' }]);

            let c2 = ex.mapPropery('name', (msg) => ': ' + msg);
            assert.deepEqual(c2, [': empty']);
        }
    }

}

