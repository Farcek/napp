import crypto from 'crypto';


const ivLength = 16;
const saltLength = 64;
const tagLength = 16;
const tagPosition = saltLength + ivLength;
const encryptedPosition = tagPosition + tagLength;

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
export class Encryption {
    constructor(private secret: string, private algorithm: 'gcm' | 'cbc') {
        if (!secret || typeof secret !== 'string') {
            throw new EncryptionError('secret must be a non-0-length string');
        }
    }
    private getKey(salt: Buffer) {
        return crypto.scryptSync(this.secret, salt, 32);
    }

    private encryptGCM(value: string) {
        try {
            let iv = crypto.randomBytes(ivLength);
            let salt = crypto.randomBytes(saltLength);

            let key = this.getKey(salt);

            let cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
            let encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);

            let tag = cipher.getAuthTag();

            return Buffer.concat([salt, iv, tag, encrypted]).toString('hex');
        } catch (error) {
            throw new EncryptionError(error.message)
        }


    };

    private decryptGCM(value: string) {
        try {
            let stringValue = Buffer.from(value, 'hex');

            let salt = stringValue.slice(0, saltLength);
            let iv = stringValue.slice(saltLength, tagPosition);
            let tag = stringValue.slice(tagPosition, encryptedPosition);
            let encrypted = stringValue.slice(encryptedPosition);

            let key = this.getKey(salt);

            let decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

            decipher.setAuthTag(tag);

            return decipher.update(encrypted) + decipher.final('utf8');
        } catch (error) {
            throw new EncryptionError(error.message)
        }


    };

    private encryptCBC(value: string) {
        try {

        } catch (error) {
            throw new EncryptionError(error.message)
        }
        let iv = crypto.randomBytes(ivLength);
        let key = this.getKey(Buffer.from('salt'));

        let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);

        return Buffer.concat([iv, encrypted]).toString('hex');
    };

    private decryptCBC(value: string) {

        try {
            let stringValue = Buffer.from(String(value), 'hex');


            let iv = stringValue.slice(0, ivLength);

            let encrypted = stringValue.slice(ivLength);

            let key = this.getKey(Buffer.from('salt'));

            let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

            return decipher.update(encrypted) + decipher.final('utf8');
        } catch (error) {
            throw new EncryptionError(error.message)
        }
    };


    encrypt(value: string) {
        if (value == null || value == undefined) {
            throw new EncryptionError('value must not be null or undefined');
        }
        if (this.algorithm == 'cbc') {
            return this.encryptCBC(value);
        } else if (this.algorithm == 'gcm') {
            return this.encryptGCM(value);
        } else {
            throw new EncryptionError('not support algorithm')
        }
    }

    decrypt(value: string) {
        if (value == null || value == undefined) {
            throw new EncryptionError('value must not be null or undefined');
        }
        if (this.algorithm == 'cbc') {
            return this.decryptCBC(value);
        } else if (this.algorithm == 'gcm') {
            return this.decryptGCM(value);
        } else {
            throw new EncryptionError('not support algorithm')
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
            let _v = this.decrypt(value);
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
