import { Encryption, EncryptionError, EncryptionTimeoutError } from '../src';

async function sleep(ms: number) {
    return await new Promise<void>(resolve => setTimeout(() => resolve(), ms));
}

async function test(algo: 'gcm' | 'cbc') {
    let t1 = new Encryption("1234", algo);

    {
        let val = "sain uu. ҮШз";
        let t = t1.encrypt(val);
        let v = t1.decrypt(t);

        if (val === v) {
            console.log("success encrypt & decrypt")
        } else {
            throw new Error("not wokring encrypt & decrypt")
        }
    }

    {
        let val = { a: 1, b: 2 };
        let t = t1.encryptObj(val);
        let v = t1.decryptObj<{ a: number, b: number }>(t);

        if (v && v.a === val.a && v.b === val.b) {
            console.log("success encryptObj & decryptObj")
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
            console.log("success encryptToken & decryptToken")
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
                return console.log("success timeout decryptToken & decryptToken");
            }
            throw new Error("not wokring timeout2 encryptToken & decryptToken")
        }

    }

}


test('cbc')
    .then(() => {
        console.log("done cbc")
    })
    .then(() => {
        return test('gcm')
            .then(() => console.log("done gcm"))
    })
    .catch(err => console.log(err))

