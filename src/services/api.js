import { callApi } from './callApi';
import { getApiBaseName } from './server';


/* ---------------------- 获得微信初始化验证 ----------------------- */

/*
 * 获得下载信息
 * data: object
 */
export const getDownloadConfig = (data) => callApi(getApiBaseName.api + 'v1/appBranchDownloadPageConfig', 'GET', data);

/*
 * 获得微信初始化验证
 * data: object
 */
export const getWechatData = (data) => callApi(getApiBaseName.search + 'v1/wechatSignature', 'POST', data);

/*
 * 微信第三方登录
 * data: object
 */
export const postWechatLogin = (data) => callApi(getApiBaseName.user + 'v1/thirdPartyAccount/signin', 'POST', data);

/**
 * 微信第三方AccessToken
 * @param {*} data
 */
export const getWxAccessToken = (data) => callApi(getApiBaseName.search + `v1/onlyGetWxAccessToken/${data.appType}`, 'GET', data);
