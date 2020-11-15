import crypto from 'crypto';



export class EncryptionError extends Error {
    name = "EncryptionError"
    constructor(message: string) {
        super(message);
    }
}
export class EncryptionTimeoutError extends EncryptionError {
    name = "EncryptionTimeoutError"
    constructor(message: string) {
        super(message);
    }
}

interface OEncryption {
    /**
     * default value 8
     */
    saltLength?: number
}
export class Encryption {

    private ivLength: number = 16;
    private saltLength: number
    constructor(private pass: string, { saltLength }: OEncryption) {
        this.saltLength = saltLength || 8;
    }
    private getKey(salt: Buffer) {
        return crypto.pbkdf2Sync(this.pass, salt, 20000, 32, 'sha256');
    }
    encrypt(value: string) {
        try {


            let iv = crypto.randomBytes(this.ivLength);
            let salt = crypto.randomBytes(this.saltLength);

            let key = this.getKey(salt);

            let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);



            let encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
            return Buffer.concat([salt, iv, encrypted]).toString('hex');
        } catch (error) {
            throw new EncryptionError((error && error.message) || 'cannot encrypt data');
        }
    }

    decript(value: string) {
        try {
            let stringValue = Buffer.from(String(value), 'hex');
            let salt = stringValue.slice(0, this.saltLength);
            let iv = stringValue.slice(this.saltLength, this.saltLength + this.ivLength);
            let encrypted = stringValue.slice(this.saltLength + this.ivLength);

            let key = this.getKey(salt);
            let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

            return decipher.update(encrypted).toString('utf8') + decipher.final('utf8');
        } catch (error) {
            throw new EncryptionError((error && error.message) || 'cannot decript data');
        }
    }

    encryptObj(value: object) {
        if (value == null || value == undefined) {
            throw new EncryptionError('value must not be null or undefined');
        }
        try {
            if (typeof value === 'object') {
                let _v = JSON.stringify(value);
                return this.encrypt(_v);
            }
            throw new EncryptionError("encrypt value is not object");
        } catch (error) {
            throw new EncryptionError(error.message);
        }

    }
    decryptObj<T>(value: string) {
        if (value == null || value == undefined) {
            throw new EncryptionError('value must not be null or undefined');
        }

        try {
            let _v = this.decript(value);
            let _o = JSON.parse(_v);
            if (typeof _o === 'object') {
                return _o as T;
            }
            throw new EncryptionError("decrypt value is not object");
        } catch (error) {
            throw new EncryptionError(error.message);
        }
    }

    encryptToken(payload: object, ex: number) {
        let t = {
            e: Date.now() + ex,
            d: payload || {}
        };
        return this.encryptObj(t);
    }
    decryptToken<T>(value: string): T {
        let t = this.decryptObj<{ e: number, d: T }>(value);
        if (t && t.e && t.d) {
            if (t.e >= Date.now()) {
                return t.d;
            }
            throw new EncryptionTimeoutError("token expired");
        }
        throw new EncryptionError("not supported token");
    }
}