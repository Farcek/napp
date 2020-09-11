import { ApiBuilder } from "./builder";


// let json: OpenAPIV3.Document = JSON.parse(readFileSync('api.json').toString());




new ApiBuilder({
    file: 'api.json',
    outDir: 'ttae',

})
    .buildComponents()
    .buildEndponts(true)
    // .buildAPI()
    .save()
    ;