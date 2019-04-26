import 'reflect-metadata';
import { Return, Name, Description, ReflectClassmeta, decoratorFactoryClass, decoratorFactoryAll } from "../src";
import { suite, test, only } from "mocha-typescript";
import { assert } from "chai";

interface IFormater {
    temp: string;

    type: number;
}
const Formater = decoratorFactoryClass<IFormater>('formater');

const Label = decoratorFactoryAll<string>('label')


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


export class BClass {


    @Label("label 1")

    a: AClass = new AClass()

}


@suite()
class CustomDecratorTest {

    @test()

    classCustom() {
        let m = ReflectClassmeta.Resolve(AClass);

        let format: IFormater = m.attrGetClass('formater');



        assert.equal(format.temp, 'test1')
        assert.equal(format.type, 18)
    }

    @test()
    properyCustom() {
        let m = ReflectClassmeta.Resolve(BClass);




        let label = m.attrGetProperty('label', 'a');
        assert.equal((label as string), 'label 1')
    }
}