// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'

//ajax请求
import '@/js/ajax/index'

//方法库
import '@/js/app.js'
import '@/js/app-supply.js'

//权限
import '@/js/authority'

//配置项预处理
import '@/js/preset.js'

//图标
import '@/css/iconfont.css'
//清除样式
import '@/css/zh-common.css'
//项目全局样式
import '@/css/common.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    mounted() {
        document.dispatchEvent(new Event('render-event'))
    }
})
