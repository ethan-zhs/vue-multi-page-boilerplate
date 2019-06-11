import Vue from 'vue';

import store from './store';
import App from './App.vue';

import './page1.less';

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    template: '<App/>',
    components: { App },
});
