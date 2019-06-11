import Utils from '../../utils/utils';

/**
 * [微信登录所需参数]
 * @param [number] obj [obj]
*/
export function wechatData() {
    const params = Utils.urlParams();

    if (params.code) {
        const dataObj = {
            os: 'wap_event',
            code: params.code,
            thirdPartyType: 'weixin'
        };

        const paramsObj = {
            header: {},
            bodyStream: JSON.stringify(dataObj),
        };

        return paramsObj;
    }

    return false;
}


/**
 * [判断是否授权过]
 * @param [number] obj [obj]
*/
export function hasWechatLogin() {
    const wechatUserId = Utils.getCookie('wechatuserId');
    const wechatToken = Utils.getCookie('wechattoken');

    const nickName = Utils.getCookie('nickName');
    const avatarUrl = Utils.getCookie('avatarUrl');


    if (wechatUserId && wechatToken) {
        return {
            userId: wechatUserId,
            jwt: wechatToken,
            nickName: nickName,
            avatarUrl: avatarUrl
        };
    }

    return false;
}
