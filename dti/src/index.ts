export type METHOD = 'GET' | 'POST';

export class RestAPI<RQ, RS> {
    constructor(
        public name: string,
        public rq: new () => RQ,
        public rs: new () => RS,
    ) {

    }
    public method: METHOD = 'GET';

    setMethod(method: METHOD) {
        this.method = method;
        return this;
    }


    public path?: string;

    setPath(path: string) {
        this.path = path;
        return this;
    }
}

