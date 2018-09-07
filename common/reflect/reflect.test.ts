import "reflect-metadata";

import { suite, test, slow, timeout } from "mocha-typescript";
import { assert } from "chai";
import { Propery, PropertyMetaKeys, PropertyMetaName } from ".";
import { Description, Index, Name, Group } from "./decorator";
import { PropertyMetaDescription, PropertyMetaIndex, PropertyMetaGroup } from "./property.meta";
import { ClassMetaName } from "./class.meta";





class Work {
    name: string = "";
    desc: string = "";
}


enum Gender {
    Mr, Mss
}

@Name("Test class")
class TestClass {

    @Propery({ name: "fullname" })
    name: string = "farcek";

    @Propery()
    @Index(10)
    gender: Gender = Gender.Mr;

    @Propery()
    @Description("hunii nas")
    age: number = 35;

    @Propery()
    @Name("ajil")
    work?: Work;

    @Propery()
    @Group("other")
    any0: any;
}

@suite
class ReflectClass {
    @test
    name() {
        let name = Reflect.getMetadata(ClassMetaName, TestClass);
        assert.equal("Test class", name);
    }
}


@suite
class ReflectPropery {
    @test
    property() {
        let members = Reflect.getMetadata(PropertyMetaKeys, TestClass);
        assert.isOk(members.name);
        assert.isOk(members.gender);
        assert.isOk(members.age);
        assert.isOk(members.work);
    }


    @test
    propertyName1() {
        let name = Reflect.getMetadata(PropertyMetaName, TestClass, "name");
        assert.equal("fullname", name);


    }
    propertyName2() {
        let name = Reflect.getMetadata(PropertyMetaName, TestClass, "work");
        assert.equal("ajil", name);

    }

    @test
    propertyType() {
        let name = Reflect.getMetadata(PropertyMetaName, TestClass, "name");
        assert.equal("fullname", name);
    }

    @test
    propertyDescription() {
        let desc = Reflect.getMetadata(PropertyMetaDescription, TestClass, "age");
        assert.equal("hunii nas", desc);
    }

    @test
    propertyIndex() {
        let idx = Reflect.getMetadata(PropertyMetaIndex, TestClass, "gender");
        assert.equal(10, idx);
    }

    @test
    propertyGroup() {
        let g = Reflect.getMetadata(PropertyMetaGroup, TestClass, "any0");
        assert.equal("other", g);
    }
}

