import Vue from 'vue';
import Vuex from 'vuex';
import weChat from '../../../global/wechat';
import wechatLogin from '../../../global/wechatLogin';

import * as actions from './actions';
import * as getters from './getters';
import { mutations } from './mutations';

Vue.use(Vuex);

const state = {
    requesting: false
};

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules: {
        weChat,
        wechatLogin
    }
});
