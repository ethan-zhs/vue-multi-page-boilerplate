import axios from 'axios';
import { getHeaders } from './createHeader';

/**
 * [全局公共插件]
 * @return {[object]} [插件对象]
 */
export function callApi(endpoint, method, data) {
    const bodyStream = data && method.toUpperCase() !== 'GET' ? JSON.stringify(data) : '';
    endpoint = paramsForGetMethod(endpoint, method, data);

    const headers = getHeaders(method, endpoint, bodyStream);
    return new Promise((resolve, reject) => {
        axios({
            method: method || 'POST',
            url: endpoint,
            data: bodyStream,
            timeout: 20000,
            responseType: 'json',
            headers: headers
        }).then((res) => resolve(res.data)).catch((err) => {
            console.log(err.response.data);
            return reject(err.response.data);
        });
    });
}


// 设置请求方法GET的参数
function paramsForGetMethod(endpoint, method, data) {
    if (method.toUpperCase() === 'GET' && data && typeof (data) == 'object') {
        const paramsArr = [];
        const keys = Object.keys(data);
        keys.forEach(key => {
            paramsArr.push(`${key}=${data[key].toString()}`);
        });
        endpoint = paramsArr.length ? `${endpoint}?${paramsArr.join('&')}` : endpoint;
    }

    return endpoint;
}
