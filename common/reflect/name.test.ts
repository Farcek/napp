import "reflect-metadata";

import { suite, test } from "mocha-typescript";
import { assert } from "chai";
import { Name, NameDecorator } from "./name.decorator";
import { ReflectName } from "./name.helper";
import { Property } from "./property.decorator";
import { ClassType } from "../common";




@Name("Foo 1 class")
class Foo1Class {
    pp?: string;
}

class Foo2Class {

    @NameDecorator("fullname")
    pp?: string;

    @Property()
    pp2?: string;
}


@suite
export class NameTestClass {


    @test
    getNameMetaClass() {
        let r1 = ReflectName.getNameMeta(Foo1Class);
        if (r1) {
            assert.equal(r1.Name, "Foo 1 class", "decration seted");
        }

        let r2 = ReflectName.getNameMeta(Foo2Class);
        let r3 = ReflectName.getNameMeta(Foo2Class);

        assert.equal(r2 && r2.Name, "Foo2Class", "one instane seted");
        assert.isTrue(r2 === r3, "one instane seted");

    }

    @test
    getNameMetaPropery() {
        let r1 = ReflectName.getNameMeta(Foo2Class, "pp");


        assert.equal(r1 && r1.Name, "fullname", "basic name");

        let r2 = ReflectName.getNameMeta(Foo2Class, "pp2");
        assert.equal(r2 && r2.Name, "pp2", "basic name");
    }


}
