require('css-reset-and-normalize-sass/css/reset-and-normalize.min.css');
require('@fortawesome/fontawesome-free/css/all.min.css');

import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: function (h) { return h(App); }
}).$mount('#app');
