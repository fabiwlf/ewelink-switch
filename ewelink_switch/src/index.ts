import crypto_js_1 from 'crypto-js';
import process from 'process';

var LanControlAuthenticationUtils = (function () {
    function LanControlAuthenticationUtils() { }
    LanControlAuthenticationUtils.encryptionData = function (_a) {
        var iv = _a.iv,
            key = _a.key,
            data = _a.data;
        try {
            var cipher = crypto_js_1.AES.encrypt(data, crypto_js_1.MD5(key), {
                iv: crypto_js_1.enc.Utf8.parse(iv),
                mode: crypto_js_1.mode.CBC,
                padding: crypto_js_1.pad.Pkcs7,
            });
            var base64Cipher = cipher.ciphertext.toString(crypto_js_1.enc.Base64);
            return base64Cipher;
        } catch (e) {
            console.error('encryptionData error: '.concat(e));
        }
    };
    LanControlAuthenticationUtils.decryptionData = function (_a) {
        var iv = _a.iv,
            key = _a.key,
            data = _a.data;
        var bytes = crypto_js_1.AES.decrypt(data, crypto_js_1.MD5(key), {
            iv: crypto_js_1.enc.Utf8.parse(iv),
            mode: crypto_js_1.mode.CBC,
            padding: crypto_js_1.pad.Pkcs7,
        });
        var decryptedData = bytes.toString(crypto_js_1.enc.Utf8);
        return decryptedData;
    };
    LanControlAuthenticationUtils.encryptionBase64 = function (str) {
        return crypto_js_1.enc.Base64.stringify(crypto_js_1.enc.Utf8.parse(str));
    };
    LanControlAuthenticationUtils.decryptionBase64 = function (base64Str) {
        return crypto_js_1.enc.Base64.parse(base64Str).toString(
            crypto_js_1.enc.Utf8
        );
    };
    return LanControlAuthenticationUtils;
})();

// https://github.com/CoolKit-Technologies/ha-addon/blob/master/eWeLink_Smart_Home/dist/apis/lanDeviceApi.js
const constructRequest = (deviceid, devicekey, selfApikey, payload) => {
    var iv = 'abcdef'.concat(Date.now().toString(), 'abcdef').slice(0, 16);
    const data = JSON.stringify(payload);
    const reqData = {
        iv: LanControlAuthenticationUtils.encryptionBase64(iv),
        deviceid: deviceid,
        selfApikey: selfApikey,
        encrypt: true,
        sequence: ''.concat(Date.now().toString()),
        data: LanControlAuthenticationUtils.encryptionData({
            iv: iv,
            data: data,
            key: devicekey,
        }),
    };
    console.log(reqData);
};

const [, , deviceid, devicekey, selfApikey, initialPayload] = process.argv;
constructRequest(
    deviceid, devicekey, selfApikey,
    initialPayload ? JSON.parse(initialPayload) : { switch: 'off' }
);