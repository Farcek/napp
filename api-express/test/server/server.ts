// process.env.DEBUG='*'
import { module } from "./module";

const express = require('express')
const app = express()
const port = 3000





// m.register(metaHelloWorld.meta)



app.use('/api-test', module.setup(express.Router()));
app.use( (err:any, req:any, res:any, next:any) => {
    console.error(err)
    console.error(err.stack)
    res.status(500).send('Something broke!' )
})

app.listen(port, () => console.log(`test app listening at http://localhost:${port}`))