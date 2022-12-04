
const CryptoJS = require('crypto-js')

function encryptContent(content, passphrase) {
    return CryptoJS.AES.encrypt(content, passphrase);
}

function decryptContent(encrypted, passphrase) {
    return CryptoJS.AES.decrypt(encrypted, passphrase).toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encryptContent, decryptContent
}