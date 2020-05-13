// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import '@/js/ajax/index'

import '@/js/app.js'
import '@/js/app-supply.js'

import '@/js/preset.js'

import '@/css/iconfont.css'
import '@/css/zh-common.css'
import '@/css/common.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
