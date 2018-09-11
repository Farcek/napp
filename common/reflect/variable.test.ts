import "reflect-metadata";

import { suite, test, only } from "mocha-typescript";
import { assert } from "chai";
import { NameDecorator } from "./name.decorator";
import { Property } from "./property.decorator";
import { ReflectProperty } from "./property.helper";
import { Type } from "./variable.decorator";
import { ReflectVariable } from "./variable.helper";
import { VariableType, VariablePrimitiveType } from "./variable";
import { ReflectMeta } from "./meta";


class FooClass {
    @Property()
    int1: number = 0;
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
}

@suite
@only
export class VariableTestClass {

    @test
    factoryVariableMetaAsPrimitive() {
        {
            let m = ReflectVariable.factoryVariableMeta(String);
            assert.equal(m.Type, VariableType.Primitive, " check String - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.String, " check String - Refrence");
        }

        {
            let m = ReflectVariable.factoryVariableMeta("string");
            assert.equal(m.Type, VariableType.Primitive, " check string - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.String, " check string - Refrence");
        }


        {
            let m = ReflectVariable.factoryVariableMeta(Number);
            assert.equal(m.Type, VariableType.Primitive, " check Number - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.Int, " check Number - Refrence");
        }

        {
            let m = ReflectVariable.factoryVariableMeta("int");
            assert.equal(m.Type, VariableType.Primitive, " check int - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.Int, " check int - Refrence");
        }



        {
            let m = ReflectVariable.factoryVariableMeta("float");
            assert.equal(m.Type, VariableType.Primitive, " check float - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.Float, " check float - Refrence");
        }

        {
            let m = ReflectVariable.factoryVariableMeta(Boolean);
            assert.equal(m.Type, VariableType.Primitive, " check Boolean - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.Boolean, " check Boolean - Refrence");
        }

        {
            let m = ReflectVariable.factoryVariableMeta("boolean");
            assert.equal(m.Type, VariableType.Primitive, " check boolean - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.Boolean, " check boolean - Refrence");
        }

        {
            let m = ReflectVariable.factoryVariableMeta(Date);
            assert.equal(m.Type, VariableType.Primitive, " check Date - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.Date, " check Date - Refrence");
        }

        {
            let m = ReflectVariable.factoryVariableMeta("date");
            assert.equal(m.Type, VariableType.Primitive, " check date - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.Date, " check date - Refrence");
        }

        {
            let m = ReflectVariable.factoryVariableMeta(Symbol);
            assert.equal(m.Type, VariableType.Primitive, " check Symbol - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.Symbol, " check Symbol - Refrence");
        }
        {
            let m = ReflectVariable.factoryVariableMeta("symbol");
            assert.equal(m.Type, VariableType.Primitive, " check symbol - Type");
            assert.equal(m.Refrence, VariablePrimitiveType.Symbol, " check symbol - Refrence");
        }


    }

    @test
    factoryVariableMetaAsComplex() {
        {
            let m = ReflectVariable.factoryVariableMeta(BarClass);
            assert.equal(m.Type, VariableType.Complex, "check Any class - Type");
            assert.equal(m.Refrence, BarClass, " check Any class - Refrence");
        }
    }

    @test
    decratorStr1() {
        let m = ReflectVariable.getVariableMeta(BarClass, "str1");
        assert.equal(m && m.Type, VariableType.Primitive, "check Any class - Type");
        assert.equal(m && m.Refrence, VariablePrimitiveType.String, " check Any class - Refrence");
    }

    @test
    @only
    decratorStr3() {
        let m = ReflectVariable.getVariableMeta(BarClass, "str3");
        console.log(m);
        assert.equal(m && m.Type, VariableType.Primitive, "check Any class - Type");
        assert.equal(m && m.Refrence, VariablePrimitiveType.String, " check Any class - Refrence");
    }
    @test
    decratorNumber() {
        let m = ReflectVariable.getVariableMeta(FooClass, "int1");
        assert.equal(m && m.Type, VariableType.Primitive, "check FooClass.int1 - Type");
        assert.equal(m && m.Refrence, VariablePrimitiveType.Int, "check FooClass.int1 - Refrence");
    }

}
