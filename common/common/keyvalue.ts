export interface KeyValue {
    key: string;
    value: string;
}

export interface KeyValueObject<T> {
    key: string;
    value: T;
}

export interface KeyValueCollection extends Array<KeyValue> { }
export interface KeyValueObjectCollection<T> extends Array<KeyValueObject<T>> { }
