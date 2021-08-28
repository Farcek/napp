import { DtiOption } from "./common";

export class Dti<RES, PQ, PB> {
    constructor(private opt: DtiOption<RES, PQ, PB>) {

    }
    get name() {        
        return this.opt.name;
    }
    get method() {
        let { method } = this.opt;
        if (method === 'get') return 'get';
        if (method === 'post') return 'post';

        if (this.opt.checkB) return 'post';

        return 'get';
    }

    get path() {
        let { name, path } = this.opt;
        if (path) return path;
        return '/' + name;
    }
    get queryMode() {
        return this.opt.queryMode || 'base64'
    }
    get bodyMode() {
        return this.opt.bodyMode || 'json'
    }

    checkQ(q: PQ) {
        if (this.opt.checkQ) {
            this.opt.checkQ(q);
        }
    }
    checkB(b: PB) {
        if (this.opt.checkB) {
            this.opt.checkB(b);
        }
    }

    static define<RES, PQ, PB>(opt: DtiOption<RES, PQ, PB>) {
        return new Dti(opt);
    }
}

let m = Dti.define({
    name: ''
})