import * as Api from '../../../services/api';

export const getReport = ({ dispatch, commit }) => {
    commit('GET_DOWNLOAD_CONFIG_REQUEST');
    Api.getDownloadConfig().then((res) => {
        commit('GET_DOWNLOAD_CONFIG_SUCCESS', res);
    }).catch((err) => {
        commit('GET_DOWNLOAD_CONFIG_FAILURE', err);
    });
};
