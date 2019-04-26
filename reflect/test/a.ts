import { Return, Name, Description } from "../src";

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