export const mutations = {
    POST_WECHAT_LOGIN_REQUEST(state) { },

    POST_WECHAT_LOGIN_SUCCESS(state, res) {
        state.wechatuserId = res.userId;
        state.wechattoken = res.jwt;
        
        state.nickName = res.nickName;
        state.avatarUrl = res.avatarUrl;
    },

    POST_WECHAT_LOGIN_FAILURE(state, err) { },
};
