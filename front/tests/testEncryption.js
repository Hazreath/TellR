let CryptoJS = require('crypto-js')
const {encryptContent, decryptContent} = require("../library/Encryption");
testEncryption()

function testEncryption() {
    let text = "slt lé cop1"
    // let crypt = CryptoJS.AES.encrypt(text,'coucou')
    // console.log('CRYPT : ',crypt)
    // let uncrypt = CryptoJS.AES.decrypt(crypt.toString(), 'coucou')
    // console.log('DECRYPTED: ', uncrypt.toString(CryptoJS.enc.Utf8))
    let crypt = encryptContent(text,"cc")
    console.log(crypt)

    let decrypt = decryptContent(crypt,"cc")
    console.log(decrypt)
}