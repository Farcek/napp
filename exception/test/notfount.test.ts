import 'reflect-metadata';
import { suite, test } from "mocha-typescript";

import { assert } from "chai";
import { NotFoundException, $$ExeptionNames, convertException } from "../src";



@suite
class NotfoundTest {
    @test
    async basic() {

        try {
            throw new NotFoundException("notfound1")
        } catch (error) {
            let err: NotFoundException = error;
            assert.equal("notfound1", err.message)
            assert.equal($$ExeptionNames.NotFound, err.name)
            assert.equal(404, err.status)

            let o = err.toJson();


        }
    }

    @test
    async convert() {

        try {
            throw new NotFoundException("notfound1")
        } catch (error) {
            let err = convertException(error) as NotFoundException;

            assert.instanceOf(err, NotFoundException);
            assert.equal("notfound1", err.message);
            assert.equal($$ExeptionNames.NotFound, err.name);
            assert.equal(404, err.status);
        }

        
    }
    @test
    async convert2() {

        try {
            throw {
                name : $$ExeptionNames.NotFound,
                message :'not2',
                status : 404
            }
        } catch (error) {
            let err = convertException(error) as NotFoundException;

            assert.instanceOf(err, NotFoundException);
            assert.equal("not2", err.message);
            assert.equal($$ExeptionNames.NotFound, err.name);
            assert.equal(404, err.status);
        }
    }
}

