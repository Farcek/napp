import { suite, test } from "mocha-typescript";
import { assert } from "chai";
import { ReflectMeta, IMeta } from "./meta";



class FooMeta implements IMeta {
    constructor(public Level: number, public v?: string) {

    }

}
class FooClass {

}

@suite
export class MetaTestClass {

    before() {
        ReflectMeta.DeleteMeta("foo", FooClass);
        ReflectMeta.DeleteMeta("foo", FooClass, "pp");
    }

    @test
    SetMetaBasic() {
        let meta = new FooMeta(2);
        let meta2 = new FooMeta(2);
        let meta3 = new FooMeta(1);


        let r1 = ReflectMeta.SetMeta("foo", meta, FooClass);
        assert.isTrue(r1);

        let r2 = ReflectMeta.SetMeta("foo", meta2, FooClass);
        assert.isTrue(r2);

        let r3 = ReflectMeta.SetMeta("foo", meta3, FooClass);
        assert.isFalse(r3);
    }

    @test
    SetMetaCheckValues() {
        let m1 = new FooMeta(1, "a");
        let m2 = new FooMeta(2, "b");

        let r1 = ReflectMeta.SetMeta("foo", m1, FooClass);
        let r2 = ReflectMeta.SetMeta("foo", m2, FooClass);
        assert.isTrue(r1, " first set");
        assert.isTrue(r2, " secont set");

        let m = ReflectMeta.GetMeta<FooMeta>("foo", FooClass);

        if (m) {
            assert.equal(m.v, "b");
        } else {
            throw new Error("SetMeta not work");
        }
    }

    @test
    SetMetaCheckProperty() {
        let m1 = new FooMeta(1, "a");
        let m2 = new FooMeta(2, "b");
        let m3 = new FooMeta(1, "c");

        // check null
        let r1 = ReflectMeta.GetMeta<FooMeta>("foo", FooClass, "pp");
        assert.isNull(r1);

        // check first
        let b2 = ReflectMeta.SetMeta("foo", m1, FooClass, "pp");
        let r2 = ReflectMeta.GetMeta<FooMeta>("foo", FooClass, "pp");
        assert.isTrue(b2);
        assert.isNotNull(r2);
        assert.equal(r2 && r2.v, "a");

        // check secont
        let b3 = ReflectMeta.SetMeta("foo", m2, FooClass, "pp");
        let r3 = ReflectMeta.GetMeta<FooMeta>("foo", FooClass, "pp");
        assert.isTrue(b3);
        assert.isNotNull(r3);
        assert.equal(r3 && r3.v, "b");

        // check secont
        let b4 = ReflectMeta.SetMeta("foo", m3, FooClass, "pp");
        let r4 = ReflectMeta.GetMeta<FooMeta>("foo", FooClass, "pp");
        assert.isFalse(b4);
        assert.isNotNull(r4);
        assert.equal(r4 && r4.v, "b");



    }
}
