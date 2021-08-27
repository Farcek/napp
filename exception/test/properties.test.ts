import 'reflect-metadata';
import { suite, test } from "@testdeck/mocha";

import { assert } from "chai";
import { ValidationException } from '../src';


@suite
class PropertiesExceptionTest {
    @test
    async basic() {
        let e = new ValidationException("check properties");
        assert.equal(e.message, "check properties")
    }
    
}

