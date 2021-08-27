export interface IException {
    name:string;
    message:string;
    
    [p:string] : any
}

export class Exception extends Error {
    public name: string;

    constructor(name: string, message: string) {
        super(message);
        this.name = name;
        // Object.setPrototypeOf(this, Exception.prototype);
    }

    toPlan() {
        return {
            name: this.name,
            message: this.message
        }
    }


    toJSON() {
        return this.toPlan();
    }

    private static parsers: Array<(err:IException) => Exception | false> = [];


    static from(err: any, parser?: (err: IException) => Exception | false) {
        if (err instanceof Exception) {
            return err;
        }

        if (err instanceof Error) {
            return new Exception(err.name, err.message);
        }

        if (err && err.name && err.message) {
            if (parser) {
                let e = parser(err)
                if (e instanceof Exception) {
                    return e;
                }
            }
            return new Exception(err.name, err.message);
        }


        for (let p of this.parsers) {
            if (err && err.name && err.message) {
                let e = p(err)
                if (e instanceof Exception) {
                    return e;
                }
            }
        }

        console.error("-- not suported error handle --");
        console.error(err);

        return new Exception("Error", "please contact developer administrator");
    }
}