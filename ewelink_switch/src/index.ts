import crypto_js_1 from 'crypto-js';
import process from 'process';

var LanControlAuthenticationUtils = (function () {
    function LanControlAuthenticationUtils() { }
    LanControlAuthenticationUtils.encryptionData = function (_a: { iv: any; key: any; data: any; }) {
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
        } catch (e: unknown) {
            console.error('encryptionData error:', e);
        }
    };
    LanControlAuthenticationUtils.decryptionData = function (_a: { iv: any; key: any; data: any; }) {
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
    LanControlAuthenticationUtils.encryptionBase64 = function (str: string) {
        return crypto_js_1.enc.Base64.stringify(crypto_js_1.enc.Utf8.parse(str));
    };
    LanControlAuthenticationUtils.decryptionBase64 = function (base64Str: string) {
        return crypto_js_1.enc.Base64.parse(base64Str).toString(
            crypto_js_1.enc.Utf8
        );
    };
    return LanControlAuthenticationUtils;
})();

// https://github.com/CoolKit-Technologies/ha-addon/blob/master/eWeLink_Smart_Home/dist/apis/lanDeviceApi.js
const constructRequest = (deviceid: string, devicekey: string, selfApikey: string, payload: any) => {
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
    return reqData;
};
console.log('Starting application...');
const [, , deviceid, devicekey, selfApikey] = process.argv;
Bun.serve({
    port: 8035,
    fetch(req) {
        const parsedUrl = new URL(req.url);
        if (parsedUrl.pathname === '/action' && req.method === "GET") {
            console.time('Generate payload');
            const urlParameters = { deviceid, devicekey, selfApikey, payload: '', host: '', dry: false, ...Object.fromEntries(parsedUrl.searchParams.entries()) };
            if (!urlParameters.host) {
                return new Response("host missing");
            }
            console.log('urlParameters', urlParameters);
            const url = `http://${urlParameters.host}/zeroconf/switch`;
            const options = {
                method: 'POST',
                headers: {
                    Host: urlParameters.host,
                    Accept: 'application/json',
                    'User-Agent': 'eWeLink_IOS/v5.11.0',
                    'Cache-Control': 'no-store',
                    'Accept-Language': 'en-GB,en;q=0.9',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(constructRequest(
                    urlParameters.deviceid, urlParameters.devicekey, urlParameters.selfApikey,
                    urlParameters.payload ? JSON.parse(urlParameters.payload) : { switch: 'off' }
                ))
            };
            console.timeEnd('Generate payload');
            if (urlParameters.dry) {
                return new Response(JSON.stringify({ url, options }), {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
            }
            // console.error(options, urlParameters.payload)
            return fetch(url, options);
        }
        return new Response("ok");
    },
});
/* const [, , deviceid, devicekey, selfApikey, initialPayload] = process.argv;
constructRequest(
    deviceid, devicekey, selfApikey,
    initialPayload ? JSON.parse(initialPayload) : { switch: 'off' }
); */