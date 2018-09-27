import "reflect-metadata";

import { suite, test, only } from "mocha-typescript";
import { assert } from "chai";
import { NameDecorator, Name } from "./name.decorator";
import { Property } from "./property.decorator";
import { ReflectProperty } from "./property.helper";
import { Type } from "./variable.decorator";
import { ReflectVariable } from "./variable.helper";
import { VariablePrimitiveType } from "./variable";
import { ReflectMeta } from "./meta";



@Name("aa")
class FooClass<T> {


    constructor(public as: string) {

    }
    @Property()
    int1: number = 0;

    @Property()
    t1!: Promise<string>;

    @Property()
    a1: string[] = [];

    @Property()
    a2?: string[];


    @Property()
    m1(a: string, b: number[]): string {
        console.log(1);
        return "";
    }

    m2(...a: string[]) {
        console.log(1);
    }



    @Property()
    t2?: Promise<string>;

    @Property()
    t3?: Promise<T>;
}

class BarClass {

    @NameDecorator("fullname")
    str1?: string;

    @Property({ type: String })
    str2?: string;

    @Type(String)
    str3: any;

    @Property({ type: "string" })
    str4?: any;

    @Type(String)
    @Property({ type: "int" })
    str5?: any;


    @Type(String, true)
    arr1?: any;


    @Property({ type: FooClass, isArray: true })
    arr2?: FooClass<number>[];
}

@suite
export class VariableTestClass {

    @test
    factoryVariableMetaAsPrimitive() {
        {
            let m = ReflectVariable.factoryVariableMeta(String);
            assert.equal(m.Type, VariablePrimitiveType.String, "check String");
        }

        {
            let m = ReflectVariable.factoryVariableMeta("string");
            assert.equal(m.Type, VariablePrimitiveType.String, "check String");
        }


        {
            let m = ReflectVariable.factoryVariableMeta(Number);
            assert.equal(m.Type, VariablePrimitiveType.Int, "check int");
        }

        {
            let m = ReflectVariable.factoryVariableMeta("int");
            assert.equal(m.Type, VariablePrimitiveType.Int, "check int");
        }

        {
            let m = ReflectVariable.factoryVariableMeta("float");
            assert.equal(m.Type, VariablePrimitiveType.Float, "check float");
        }

        {
            let m = ReflectVariable.factoryVariableMeta(Boolean);
            assert.equal(m.Type, VariablePrimitiveType.Boolean, "check bool");
        }

        {
            let m = ReflectVariable.factoryVariableMeta("boolean");
            assert.equal(m.Type, VariablePrimitiveType.Boolean, "check bool");
        }

        {
            let m = ReflectVariable.factoryVariableMeta(Date);
            assert.equal(m.Type, VariablePrimitiveType.Date, "check date");
        }

        {
            let m = ReflectVariable.factoryVariableMeta("date");
            assert.equal(m.Type, VariablePrimitiveType.Date, "check date");
        }

    }

    @test
    factoryVariableMetaAsComplex() {
        {
            let m = ReflectVariable.factoryVariableMeta(BarClass);
            assert.equal(m.Type, VariablePrimitiveType.Custom, "check Any class - Type");
            assert.equal(m.TypeName, "BarClass", " check Any class - typename");
            assert.equal(m.TypeRef, BarClass, " check Any class - Refrence");
        }
    }

    @test
    decratorStr1() {
        let m = ReflectVariable.getVariableMeta(BarClass, "str1");
        assert.equal(m && m.Type, VariablePrimitiveType.String, "check Any class - Type");
        assert.equal(m && m.TypeRef, String, " check Any class - Refrence");
    }

    @test
    decratorStr3() {
        let m = ReflectVariable.getVariableMeta(BarClass, "str3");
       
        assert.equal(m && m.Type, VariablePrimitiveType.String, "check Any class - Type");
        assert.equal(m && m.TypeRef, String, " check Any class - Refrence");
    }
    @test
    decratorNumber() {
        let m = ReflectVariable.getVariableMeta(FooClass, "int1");
        assert.equal(m && m.Type, VariablePrimitiveType.Int, "check FooClass.int1 - Type");
        assert.equal(m && m.TypeRef, Number, "check FooClass.int1 - Refrence");
        assert.equal(m && m.TypeName, "int", "check FooClass.int1 - Typename");
    }

    @test
    decratorArray() {
        let m = ReflectVariable.getVariableMeta(BarClass, "arr1");
        assert.equal(m && m.Type, VariablePrimitiveType.Array, "check BarClass.arr1 - Type");
        assert.equal(m && m.TypeRef, Array, "check BarClass.arr1 - Refrence");
        assert.equal(m && m.IsArray, true, "check BarClass.arr1 - isArray");
    }

    @test
    decratorArray2() {
        let m = ReflectVariable.getVariableMeta(BarClass, "arr2");
        assert.equal(m && m.Type, VariablePrimitiveType.Array, "check BarClass.arr2 - Type");
        assert.equal(m && m.TypeRef, Array, "check BarClass.arr2 - Refrence");
        assert.equal(m && m.IsArray, true, "check BarClass.arr2 - isArray");
        assert.equal(m && m.ArrayElement && m.ArrayElement.TypeRef, FooClass, "check BarClass.arr2 - array element");
    }

}
