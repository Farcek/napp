import { Name, Description, Return, ReflectClassmeta, decoratorFactoryClass, decoratorFactoryArgumentAndProperty } from "../src";

@Name('sample class')
@Description('sample class desc')
class SampleClass {

    @Name('age')
    age: number = 0;

    @Name('description')
    desc: string = '';

    @Return(String)
    save(@Name('data') data: number) {

    }
}


{
    let meta = ReflectClassmeta.Resolve(SampleClass);

    meta.classGetName() // "sample class"
    meta.classGetDescription() // "sample class desc"

    meta.propertyGetName('age') // "age"
    meta.propertyGetDescription('age') // ""
    meta.propertyGetType('age') // ReflectTypes.int

    meta.propertyGetName('desc') // "des"
    meta.propertyGetDescription('desc') // "description"
    meta.propertyGetType('desc') // ReflectTypes.string


    meta.methodGetName('save') // "save"
    meta.methodGetDescription('save') // ""
    meta.methodGetReturn('save') // ReflectTypes.string

    meta.argumentGetName('save', 0) // "data"
    meta.argumentGetDescription('save', 0) // ""
    meta.argumentGetType('save', 0) // ReflectTypes.int
}


interface ICustommeta {
    name: string;
    flag: number;
}

// custom  decorator
function User(param:ICustommeta){
    return decoratorFactoryClass<ICustommeta>(param,"user");
}
function Caption(param:ICustommeta){
    return decoratorFactoryArgumentAndProperty<ICustommeta>(param,"caption");
}


//
@User({ name: 'sample', flag: 11 })
class SampleClass2 {

    @Caption({ name: 'foo', flag: 1 })
    foo: Date = new Date();


    baa(@Caption({ name: 'a param', flag: 3 }) a: boolean) {

    }
}


{
    let meta = ReflectClassmeta.Resolve(SampleClass);
    meta.attrGetClass('user'); // { name: 'sample', flag: 11 }
    meta.attrGetProperty('caption', 'foo') // { name: 'foo', flag: 1 }
    meta.attrGetArguments('caption', 'baa', 0) // {name: 'a param', flag: 3}
}
