const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

export function jsonBodyparser() {
    return bodyParser.json()
}