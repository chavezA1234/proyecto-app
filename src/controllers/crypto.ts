import { randomBytes} from 'crypto';
const Aes = require('aes-256-gcm');
const mySecretKey = process.env.SECRET_KEY;
const iv = randomBytes(12);


export function jsonOut(sts: number, dscrp: string) {
    let jsonResponse = {
        status: sts,
        message: dscrp
    }
    return jsonResponse
}

export function encryptData(B64: any) {
    B64 = B64.trim()
    let { ciphertext, iv, tag } = Aes.encrypt(B64, mySecretKey);
    let encryp = ciphertext + '|' + iv + '|' + tag;
    //console.log("template cifrado "+ encryp)
    return encryp;
}

export function decryptData(encodeGCM: any) {
    let splitted = encodeGCM.split("|", 3);
    let ciphertext = splitted[0];
    let iv = splitted[1];
    let tag = splitted[2];
    let cleartext = Aes.decrypt(ciphertext, iv, tag, mySecretKey);
    return cleartext;
}