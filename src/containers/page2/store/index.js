import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import { mutations } from './mutations';

Vue.use(Vuex);

const state = {
    requesting: false,
    downloadConfig: {}
};

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
});
