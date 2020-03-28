// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

if(config.element) {
    const ElementUI = require('element-ui');
    require('element-ui/lib/theme-chalk/index.css');
    Vue.use(ElementUI);
};

import config from '../config'

Vue.config.productionTip = false


if(process.env.NODE_ENV !== 'development' ){
    if(config.build.sentry) {
        Raven.config(config.build.sentry.dsn).addPlugin(RavenVue, Vue).install();
        Vue.config.errorHandler = function(err, vm, info) {
            Raven.captureException(err);
            console.error(err);
        };
    };
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
