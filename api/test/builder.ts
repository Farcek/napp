import { ApiBuilder } from "@napp/api-builder";

new ApiBuilder({
    file: 'test/api.json',
    outDir: '_tmp_builder',

})
    .buildComponents()
    .buildEndponts(true)
    // .buildAPI()
    .save()
    ;