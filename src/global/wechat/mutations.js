

export const mutations = {
    GET_WECHAT_DATA(state, res) {
        state.wechatData = res;
        state.netstatus = res.netstatus;
    },

    GET_WECHAT_DATA_FAILURE(state, err) {
        state.netstatus = 'wifi';
    },
    
    GET_WX_ACCESS_TOKEN_REQUEST(state) {
        state.requesting = true;
    },
    GET_WX_ACCESS_TOKEN_SUCCESS(state, res) {
        state.requesting = false;
        state.wxToken = res.accessToken;
    },
    GET_WX_ACCESS_TOKEN_FAILURE(state, err) {
        state.requesting = false;
    },
};
