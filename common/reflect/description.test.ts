import "reflect-metadata";

import { suite, test } from "mocha-typescript";
import { assert } from "chai";
import { Name, NameDecorator } from "./name.decorator";
import { ReflectName } from "./name.helper";
import { Property } from "./property.decorator";
import { ClassType } from "../common";
import { Description } from "./description.decorator";
import { ReflectDescription } from "./description.helper";





@Description("Bar")
class BarClass {

    @Description("p")
    pp?: string;

    @Property({ description: "p2" })
    pp2?: string;
}


@suite
export class DescriptionTestClass {


    @test
    DescriptionCheck() {
        let r1 = ReflectDescription.getMeta(BarClass);
        if (r1) {
            assert.equal(r1.Description, "Bar", "decration seted");
        }

        let r2 = ReflectDescription.getMeta(BarClass, "pp");
        let r3 = ReflectDescription.getMeta(BarClass, "pp2");
        

        assert.equal(r2 && r2.Description, "p", "Description set");
        assert.equal(r3 && r3.Description, "p2", "Property set");
        

    }


}
