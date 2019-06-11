import * as actions from './actions';
import * as getters from './getters';
import { mutations } from './mutations';

const state = {
    requesting: false,
    wechatData: {},
    netstatus: 'wifi',
    wxToken: ''
};

export default {
    actions,
    getters,
    state,
    mutations
};
