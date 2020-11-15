import { Encryption, EncryptionTimeoutError } from '../src';

async function sleep(ms: number) {
    return await new Promise<void>(resolve => setTimeout(() => resolve(), ms));
}

async function test(pass: string, salt: number, format: 'hex' | 'base64') {
    console.log('test ---------------------------------', 'pass=', pass, 'salt=', salt, 'format=', format)
    let t1 = new Encryption(pass, { saltLength: salt, format });

    {
        let val = "sain uu. ҮШз";
        let t = t1.encrypt(val);
        let v = t1.decript(t);

        if (val === v) {
            console.log("success encrypt & decrypt", t, v)
        } else {
            throw new Error("not wokring encrypt & decrypt")
        }
    }

    {
        let val = { a: 1, b: 2 };
        let t = t1.encryptObj(val);
        let v = t1.decryptObj<{ a: number, b: number }>(t);

        if (v && v.a === val.a && v.b === val.b) {
            console.log("success encryptObj & decryptObj", t, v)
        } else {
            throw new Error("not wokring encryptObj & decryptObj")
        }
    }

    {
        let val = { a: 1, b: 2 };
        let t = t1.encryptToken(val, 500);
        await sleep(300)
        let v = t1.decryptToken<{ a: number, b: number }>(t);

        if (v && v.a === val.a && v.b === val.b) {
            console.log("success encryptToken & decryptToken", t, v)
        } else {
            throw new Error("not wokring encryptToken & decryptToken")
        }
    }


    {
        let val = { a: 1, b: 2 };
        let t = t1.encryptToken(val, 500);
        await sleep(1000);
        try {
            let v = t1.decryptToken<{ a: number, b: number }>(t);
            throw new Error("not wokring timeout 1 encryptToken & decryptToken")
        } catch (error) {
            if (error instanceof EncryptionTimeoutError) {
                return console.log("success timeout decryptToken & decryptToken", t);
            }
            throw new Error("not wokring timeout2 encryptToken & decryptToken")
        }

    }

}


test('123', 12, 'hex')
    .then(() => test('123', 12, 'base64'))
    .then(() => test('sdfs5df4s5df54s5df5sdfs', 48, 'hex'))
    .catch(err => console.log(err))


