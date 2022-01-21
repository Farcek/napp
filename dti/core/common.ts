export enum DtiMode {
    QJson = 'qjson',
    QStr = 'qstr',
    BJson = 'bjson',
    BForm = 'bform',
}

export interface Serializer<T> {
    encode: (param: T) => string;
    decode: (text: string) => T;
}
export interface DtiOption<RES, RQ = void, RB = void> {
    name: string;
    role?: (q: RQ, b: RB) => string,
    path?: string;
    method?: 'get' | 'post';
    // serializer?: string | { q?: Serializer<RQ>, b?: Serializer<RB> };    
    // bodyParser?: string;

    /**
     * default: json
     */
    bodyMode?: string;

    /**
     * default: base64
     */
    queryMode?: string;

    checkQ?: (q: RQ) => void;
    checkB?: (b: RB) => void;
}