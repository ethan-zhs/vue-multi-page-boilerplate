import Utils from '../../utils/utils';
import * as Api from '../../services/api';
import { wechatData } from './constants';

/**
 * [微信登录]
 *  @param [func] commit [dispatch方法]
 * @param [obj] data [获取登录数据的请求data]
 */
export const postWechatLogin = ({ dispatch, commit }) => {
    const obj = wechatData();
    if (obj) {
        commit('POST_WECHAT_LOGIN_REQUEST');

        Api.postWechatLogin(obj).then((res) => {
            commit('POST_WECHAT_LOGIN_SUCCESS', res);
            Utils.setCookie('wechatuserId', res.userId, 30);
            Utils.setCookie('wechattoken', res.jwt, 30);

            Utils.setCookie('nickName', res.nickName, 30);
            Utils.setCookie('avatarUrl', res.avatarUrl, 30);
        }, (err) => {
            commit('POST_WECHAT_LOGIN_FAILURE', err);
        });
    }
};
