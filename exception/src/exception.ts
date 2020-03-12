export type IExceptionDataValue = string | number | Date | boolean | null;
export interface IExceptionData {
    [name: string]: IExceptionDataValue | IExceptionDataValue[] | IExceptionData;
}

export class Exception extends Error {

    public name: string;
    public data: IExceptionData = {};

    constructor(name: string, message: string) {
        super(message);
        this.name = name;
        // Object.setPrototypeOf(this, Exception.prototype);
    }


    clearData() {
        this.data = {};
        return this;
    }
    setData(data: IExceptionData) {

        if (typeof data === 'object') {
            let _data = data || {};
            let keys = Object.keys(_data);
            for (let _name of keys) {
                let _value = _data[_name];
                this.setDataValue(_name, _value);
            }
        }
        return this;
    }

    getDataValue(name: string) {
        return this.data[name];
    }
    setDataValue(name: string, value: IExceptionDataValue | IExceptionDataValue[] | IExceptionData) {
        this.data[name] = value;
        return this;
    }

    toObject() {
        return {
            name: this.name,
            message: this.message,
            data: this.data
        }
    }

    toJson() {
        return this.toObject();
    }

    toNameData() {
        return {
            name: this.name,
            data: this.data
        }
    }
}
