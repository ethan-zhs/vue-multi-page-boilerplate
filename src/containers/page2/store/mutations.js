export const mutations = {
    'GET_DOWNLOAD_CONFIG_REQUEST'(state) {
        state.requesting = true;
    },
    'GET_DOWNLOAD_CONFIG_SUCCESS'(state, res) {
        state.requesting = false;
        state.downloadConfig = res;
        console.log(state.downloadConfig);
    },
    'GET_DOWNLOAD_CONFIG_FAILURE'(state, err) {
        state.requesting = false;
    }
};
