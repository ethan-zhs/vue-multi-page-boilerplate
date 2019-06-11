import * as Api from '../../services/api';
import {
    weChatData, weChatRequestData, weChatConfig, wechatNetstatus, weChatShareNew
} from './constants';


/**
 * [获得微信校验数据]
 * @param [func] commit [dispatch方法]
 * @param [object] data [title 标题, desc 描述, imgUrl 封面]
*/
export const getWeChatData = ({ commit }, data) => {
    const obj = weChatData();
    Api.getWechatData(obj).then((res) => {
        weChatConfig(res);

        const networkType = wechatNetstatus();
        const wechatObj = {
            netstatus: networkType,
        };

        commit('GET_WECHAT_DATA', Object.assign({}, wechatObj, res));
        weChatShareNew(data);
    }).catch((error) => {
        commit('GET_WECHAT_DATA_FAILURE', error);
    });
};

/**
 * 获取应用token
 * @param [func] commit [dispatch方法]
 */
export const getWxAccessToken = ({ commit }) => {
    const obj = weChatRequestData();
    commit('GET_WX_ACCESS_TOKEN_REQUEST');
    Api.getWxAccessToken(obj).then((res) => {
        commit('GET_WX_ACCESS_TOKEN_SUCCESS', res);
        console.log(res);
    }).catch((error) => {
        commit('GET_WX_ACCESS_TOKEN_FAILURE', error);
        console.log(error);
    });
};
