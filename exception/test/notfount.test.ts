import 'reflect-metadata';
import { suite, test } from "mocha-typescript";

import { assert } from "chai";
import { NotFoundException, ExceptionConvert, Exception } from "../src";



@suite
class NotfoundTest {
    @test
    async basic() {

        try {
            throw new NotFoundException("notfound1").setData({a:1})
        } catch (error) {
            let err: NotFoundException = error;
            assert.equal("notfound1", err.message)
            assert.equal(1, err.getDataValue('a'))

            

        }
    }

    @test
    async convert() {

        try {
            throw new NotFoundException("notfound1").setDataValue('b',2)
        } catch (error) {
            let err = ExceptionConvert(error) as NotFoundException;

            assert.instanceOf(err, NotFoundException);
            assert.equal("notfound1", err.message);
            assert.equal(2, err.getDataValue('b'));
        }

        
    }
    @test
    async convert2() {

        try {
            throw {
                name : 'test',
                message :'not2',
                data : {c:3}
            }
        } catch (error) {
            let err = ExceptionConvert(error);

            assert.instanceOf(err, Exception);
            assert.equal("not2", err.message);
            assert.equal('test', err.name);
            assert.equal(3, err.getDataValue('c'));
        }
    }
}

