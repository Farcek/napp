import "reflect-metadata";

import { suite, test, only } from "mocha-typescript";
import { assert } from "chai";
import { ReflectMeta, BaseMeta } from "./meta";
import { ReflectMetaFactory } from "./meta.factory";






class FooClass {

}

function classDecorator1(aa: number) {
    return ReflectMetaFactory.ClassDecorator((target) => {

        (target as typeof FooClass11).vv = aa;
    });
}

function properyDecorator1(aa: string) {
    return ReflectMetaFactory.PropertyDecorator((target, property) => {
        (ss as any)[property] = aa
    });
}

let ss = {
    cc: ''
}

@classDecorator1(11)
class FooClass11 {

    static vv = 32

    @properyDecorator1("nostatic cc")
    cc: number = 3;
}


@suite
@only
export class DecoderFactoryClass {
    @test
    reflect() {
        Reflect.defineMetadata("aa", 23, FooClass);
        Reflect.defineMetadata("aa", 33, FooClass);

        let r = Reflect.getMetadata("aa", FooClass);
        assert.equal(r, 33);
    }


    @test
    classFactory() {
        assert.equal(FooClass11.vv, 11);
    }
    @test
    propertyFactory() {
        assert.equal(ss.cc, "nostatic cc");
    }
}
