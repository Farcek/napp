import "reflect-metadata";

import { suite, test } from "mocha-typescript";
import { assert } from "chai";
import { NameDecorator } from "./name.decorator";
import { Property } from "./property.decorator";
import { ReflectProperty } from "./property.helper";




class Foo2Class {

    @NameDecorator("fullname")
    pp?: string;

    @Property()
    pp2?: string;
}

@suite
export class PropertyTestClass {



    @test
    getProperies() {
        let p = ReflectProperty.GetProperiesMeta(Foo2Class).Names;
        assert.isTrue(p.pp);
        assert.isTrue(p.pp2);
    }

}
