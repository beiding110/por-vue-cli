export default {
    path: 'project',
    component: () => import(/*webpackChunkName: 'pc-tw-project'*/ '@layout/empty'),
    children: [
        {
            path: 'list',
            component: () => import(/*webpackChunkName: 'pc-tw-project'*/ '@views/pc/teamwork/project/list'),
            meta: {
                title: '项目列表',
                bread: [
                    {
                        title: '项目列表',
                        path: '/pc/teamwork/project/list'
                    }
                ]
            }
        }
    ]
}
