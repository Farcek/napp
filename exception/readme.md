# common exception

javascript error common library. basic error library

- error -> json string -> error
- customer error


# basic error

``` typescript

let err = new Exception('err1','msg1');

let obj = err.toPlan();
// obj output
//
// {
//      name: "err1",
//      message: "msg1"
// }

let errStr = JSON.stringify()
// errStr output
//
// {
//      "name": "err1",
//      "message": "msg1"
// }

```


# avilable error

``` typescript

let err = new Exception('err1','msg1');
// err = {name: "err1", message: "msg1"}

let err1 = new NotFoundException('message1');
// err2 = {name: "notfound", message: "message1"}

let err2 = new NotSupportedException('message2')
// err2 = {name: "notsupported", message: "message2"}

let err31 = new AuthenticationException();
// err31 = {name: "authentication", message: "requared authentication"}

let err32 = new AuthenticationException("message32");
// err32 = {name: "authentication", message: "message32"}

let err4 = new AuthorizationException('message4');
// err4 = {name: "authorization", message: "message4"}

let err5 = new ServerException("message5");
// err5 = {name: "server", message: "message5"}

let err6 = new ValidationException("message6");
// err6 = {name: "validation", message: "message6"}

```



# custom error

``` typescript
class MyError extends Exception {

    other: string;
    constructor(m: string, other: string) {
        super("MyError", m);
        this.other = other;
    }

    toPlan() {
        let obj = super.toPlan();
        return {
            ...obj,
            other: this.other
        }
    }
}

let obj = new MyError('msg1', 'other1').toPlan();
// obj output
//
// {
//      name: "MyError",
//      message: "msg1",
//      other : "other1"
// }


let e1 = Exception.from(obj, (obj, param) => {
    if (param.name === 'MyError') {
        return new MyError(param.message, obj.other)
    }
    return false
});



if (e1 instanceof MyError) {
    assert.equal("MyError", e1.name)
    assert.equal("custom1", e1.message)
    assert.equal("val1", e1.other)
} else {
    throw new Error('not working convert');
}

```