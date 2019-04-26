import 'reflect-metadata';
import { Return, Name, Description, ReflectClassmeta, decoratorFactoryClass, decoratorFactoryAll } from "../src";
import { suite, test, only } from "mocha-typescript";
import { assert } from "chai";

interface IFormater {
    temp: string;

    type: number;
}
const Formater = decoratorFactoryClass<IFormater>(() => true);

const Label = decoratorFactoryAll<string>(() => true)


@Formater({ temp: 'test1', type: 18 })
export class AClass {


    public id: string = ''

    @Description('dsdsd')
    public name: string = ''

    @Return('int')
    m(a: string) {
        return a;
    }

    b(i: number): String {
        return 'a'
    }
}

@Formater({ temp: 'test1', type: 18 })
@Formater({ temp: 'test2', type: 20 })
export class BClass {


    @Label("label 1")
    @Label("label 2")
    a: AClass = new AClass()

}


@suite()
class CustomDecratorTest {

    @test()

    classCustom() {
        let m = ReflectClassmeta.Resolve(AClass);
        assert.isArray(m.attr);
        let attr = m.attrGetClass();
        assert.isTrue(attr.length > 0);

        let o: IFormater = attr[0];
        assert.equal(o.temp, 'test1')
        assert.equal(o.type, 18)
    }

    @test()
    classCustomMulti() {
        let m = ReflectClassmeta.Resolve(BClass);
        assert.isArray(m.attr);
        let formats = m.attrGetClass();

        assert.equal((formats[1] as IFormater).type, 20)

        let labels = m.attrGetPropery('a');
        assert.equal((labels[1] as string), 'label 2')
    }
}