import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import MD5 from 'crypto-js/md5';

/**
 * [获得异步header]
 * @param  {[string]} method     [description]
 * @param  {[string]} requestUrl [description]
 * @param  {[string]} bodyStream [description]
 * @return {[object]} headers [description]
 */
export function getHeaders(method, requestUrl, bodyStream, headerAdd) {
    const Timestamp = new Date().getTime();
    const key = 'test key';
    const secret = 'test secret';
    let headers = {};

    let md5 = '';
    let contentMD5 = '';

    if (bodyStream) {
        md5 = MD5(bodyStream);
        contentMD5 = Base64.stringify(md5);
    }

    const stringToSigned = `${method}\n${requestUrl}\n${Timestamp}\n${contentMD5}`;

    const sign = Base64.stringify(HmacSHA256(stringToSigned, secret));

    headers = {
        'Content-Type': 'application/json',
    };


    return headers;
}
