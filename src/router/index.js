import Vue from 'vue'
import Router from 'vue-router'
import guards from './guards'

import pc from '@views/pc/router.js'

Vue.use(Router)

var router = new Router({
    routes: [
        pc,
        {
            path: '/',
            name: 'HelloWorld',
            component: () => import(/*webpackChunkName: 'pc'*/ '@/components/HelloWorld'),
            meta: {
                title: '惠咨询'
            },
        }
    ]
});

guards(router);

export default router
