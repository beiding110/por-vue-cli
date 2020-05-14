import teamwork from './modules/teamwork/index'

export default {
    path: '/pc',
    component: () => import(/*webpackChunkName: 'pc'*/ '@layout/modules/empty'),
    meta: {
        title: '惠咨询'
    },
    children: [
        {
            path: 'login',
            component: () => import(/*webpackChunkName: 'pc-login'*/ '@views/pc/login'),
            meta: {
                title: '惠咨询登录'
            }
        },
        teamwork
    ]
}
