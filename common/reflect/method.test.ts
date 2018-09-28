import "reflect-metadata";

import { suite, test, only } from "mocha-typescript";
import { assert } from "chai";
import { Name, NameDecorator } from "./name.decorator";
import { ReflectName } from "./name.helper";
import { Property } from "./property.decorator";
import { ClassType } from "../common";





class Foo2Class {


    pp?: string;

    @Property()
    pp2?: string;

    m1(): number {
        return 11;
    }


    @Property()
    m2() {
        return 11;
    }

    @Property()
    m22(): number {
        return 11;
    }

    @Property()
    async m3() {
        return 11;
    }

    @Property()
    async m4(): Promise<number> {
        return 11;
    }
}


@suite

export class MethodTestClass {


    @test
    getNameMetaClass() {
        let r = Reflect.getMetadataKeys(Foo2Class.prototype, "m1");

        console.log(r);

    }




}
