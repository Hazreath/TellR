
const CryptoJS = require('crypto-js')

async function encryptContent(content, passphrase) {
    let crypted = await CryptoJS.AES.encrypt(content, passphrase)
    return crypted.toString();
}

async function decryptContent(encrypted, passphrase) {
    console.log(encrypted)
    let dec = await CryptoJS.AES.decrypt(encrypted, passphrase)
    return dec.toString(CryptoJS.enc.Utf8); //
}

function serialize(encrypted) {
    console.log(encrypted)
    // $super
    //     :
    // {$super: {…}, init: ƒ, toString: ƒ}
    // algorithm {keySize: 8, _doReset: ƒ, encryptBlock: ƒ, decryptBlock: ƒ, _doCryptBlock: ƒ, …}
    // ciphertext WordArray.init {words: Array(4), sigBytes: 16}
    // formatter : {stringify: ƒ, parse: ƒ}
    // init
    // iv  {$super: {…}, words: Array(4), sigBytes: 16, init: ƒ}
    // key {$super: {…}, words: Array(12), sigBytes: 32, init: ƒ}
    // mode {$super: {…}, Encryptor: {…}, Decryptor: {…}, init: ƒ}
    // padding {pad: ƒ, unpad: ƒ}
    // salt WordArray.init {words: Array(2), sigBytes: 8}
    let r = {
        cipherText : encrypted.cipherText.words,
        iv: {words: encrypted.iv.words, sigBytes:""}
    }
}

module.exports = {
    encryptContent, decryptContent
}