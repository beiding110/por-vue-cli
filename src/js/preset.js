import Vue from 'vue'
import config from '@/config'

if(config.element) {
    const ElementUI = require('element-ui');
    Vue.use(ElementUI);

    const zhui = require('@components/index.js');
    Vue.use(zhui.default);


    const THTME = config['element-theme'];
    const THEME_OBJ = {
        default: () => require('element-ui/lib/theme-chalk/index.css'),
        purple: () => require('@css/theme/purple/index.css'),
        orange: () => require('@css/theme/orange/index.css'),
    };

    THEME_OBJ[THTME]();
};
if(config.mint) {
    const Mint = require('mint-ui');
    require('mint-ui/lib/style.css');
    Vue.use(Mint);
};
if(process.env.NODE_ENV !== 'development' ){
    if(config.sentry) {
        const Raven = require('raven-js');
        const RavenVue = require('raven-js/plugins/vue');

        Raven.config(config.sentry.dsn).addPlugin(RavenVue, Vue).install();
        Vue.config.errorHandler = function(err, vm, info) {
            Raven.captureException(err);
            console.error(err);
        };
    };
};
