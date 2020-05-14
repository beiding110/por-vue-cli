export default {
    path: 'project',
    component: () => import(/*webpackChunkName: 'tw-project'*/ '@layout/modules/empty'),
    children: [
        {
            path: 'list',
            component: () => import(/*webpackChunkName: 'tw-project'*/ '@views/pc/teamwork/project/list'),
            meta: {
                title: '项目列表'
            }
        }
    ]
}
