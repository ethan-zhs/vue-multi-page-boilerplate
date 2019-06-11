import Vue from 'vue';

import Toast from '../../components/Toast/index.vue';
import store from './store';
import App from './App.vue';

Vue.prototype.$toast = new Vue(Toast).$mount();

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    template: '<App/>',
    components: { App },
});
