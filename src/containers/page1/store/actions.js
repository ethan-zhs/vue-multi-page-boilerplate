import * as Api from '../../../services/api';

// 设置children
export const setChildren = ({ dispatch, commit }, res) => {
    commit('SET_CHILDREN_SUCCESS', res);
};
