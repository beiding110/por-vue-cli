import Vue from 'vue'
import config from '@/config'

if(config.element) {
    const ElementUI = require('element-ui');
    require('element-ui/lib/theme-chalk/index.css');
    Vue.use(ElementUI);
};
if(config.mint) {
    const Mint = require('mint-ui');
    require('mint-ui/lib/style.css');
    Vue.use(Mint);
};
if(process.env.NODE_ENV !== 'development' ){
    if(config.sentry) {
        Raven.config(config.sentry.dsn).addPlugin(RavenVue, Vue).install();
        Vue.config.errorHandler = function(err, vm, info) {
            Raven.captureException(err);
            console.error(err);
        };
    };
};
