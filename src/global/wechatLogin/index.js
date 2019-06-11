
import * as actions from './actions';
import * as getters from './getters';
import { mutations } from './mutations';

const state = {
    wechatuserId: 0,
    wechattoken: '',
    nickName: '',
    avatarUrl: ''
};

export default {
    actions,
    getters,
    state,
    mutations
};
