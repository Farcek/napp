import 'reflect-metadata';
import { suite, test } from "@testdeck/mocha";

import { assert } from "chai";
import { NotFoundException, Exception } from "../src";



@suite
class NotfoundTest {
    @test
    async basic() {

        try {
            throw new NotFoundException("notfound1")
        } catch (error) {
            let err: NotFoundException = error;
            assert.equal("notfound1", err.message)
        }
    }

    
}

