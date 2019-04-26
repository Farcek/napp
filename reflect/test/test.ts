import 'reflect-metadata';
import { suite, test, only } from "mocha-typescript";
import { assert } from "chai";
import { Name, Type, Return, Description, ReflectClassmeta } from "../src/index";
import { AClass } from "./a";


@Name('class name')
@Description('class description1')
@Description('class description2')
class SampleClass {

    @Name('pa')
    @Description('a property description')
    a: string = ''

    @Name('pb')
    @Type('int')
    b: number = 1

    @Description('propery boolean c')
    c: boolean = false


    @Return(Date)
    @Description('mthod desc')
    @Name('method a')
    methodA() {
        return new Date()
    }


    @Name('method b')
    methodB(@Name('arg i1') i1: number, @Description('a2 string') a2: string, no: any, @Type('float') type: any) {
        return new Date()
    }


    methodC(@Name('arg i1') i1: number) {
        return new Date()
    }
}



@suite()
class NameAndDescTest {
    meta = ReflectClassmeta.Resolve(SampleClass);

    @test()
    className() {
        assert.deepEqual(this.meta.classGetName(), 'class name')
        assert.deepEqual(this.meta.classGetDescription(), 'class description1')

    }

    @test()
    properyName() {
        let a = this.meta.properyGet('a');
        assert.deepEqual(a.name, 'pa')
        assert.deepEqual(a.description, 'a property description')

        let b = this.meta.properyGet('b');
        assert.deepEqual(b.name, 'pb')
        assert.deepEqual(b.description, undefined)

        let c = this.meta.properyGet('c');
        assert.isDefined(c)
        assert.deepEqual(c.description, 'propery boolean c')
    }
    @test()
    methodName() {
        {
            let m = this.meta.methodGet('methodA');
            assert.deepEqual(m.name, 'method a')
            assert.deepEqual(m.description, 'mthod desc')

        }

        {
            let m = this.meta.methodGet('methodB');
            assert.deepEqual(m.name, 'method b')
            assert.deepEqual(m.description, undefined)
        }

    }
    @test()
    argumentName() {
        {
            let a = this.meta.argumentGet('methodB', 0);
            assert.deepEqual(a.name, 'arg i1')
            assert.deepEqual(a.description, undefined)
            assert.deepEqual(a.type, undefined)
        }

        {
            let a = this.meta.argumentGet('methodB', 1);
            // assert.deepEqual(a.name, ['arg i1'])
            assert.deepEqual(a.description, 'a2 string')
            // assert.deepEqual(a.type, undefined)
        }
        {
            let a = this.meta.argumentGet('methodB', 3);
            // assert.deepEqual(a.name, ['arg i1'])
            // assert.deepEqual(a.description, ['a2 string'])
            assert.deepEqual(a.type && a.type.name, 'float')
        }
    }

    @test()
    designType() {
        {
            let type = this.meta.properyGetType('a');
            assert.deepEqual(type.name, 'string');
        }

        {
            let type = this.meta.properyGetType('c');
            assert.deepEqual(type.ref, Boolean);
        }

        {
            let type = this.meta.properyGetName('c');
            assert.deepEqual(type, 'c');
        }

        {
            let type = this.meta.argumentGetType('methodB', 0);
            assert.deepEqual(type.ref, Number);            
        }

        {
            let type = this.meta.argumentGetType('methodB', 1);
            assert.deepEqual(type.ref, String);            
        }
        {
            let type = this.meta.argumentGetType('methodB', 2);
            assert.deepEqual(type.ref, String);            
        }
        {
            let type = this.meta.argumentGetType('methodB', 3);
            assert.deepEqual(type.ref, String);            
        }



    }


}