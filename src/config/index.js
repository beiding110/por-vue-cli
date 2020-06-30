const path = require('path')

export default {
    //ajax类型axios或jquery，用法相同
    ajax: 'jquery',
    sentry: {
        dsn: 'https://4efc6c77e7e64921966612b3e3cc4355@sentry.io/5171325',
        map: {
            // 要上传的文件夹
            include: path.join(__dirname, '../dist/static/js/'),
            // ~/为网站根目录，后续路径须对应source
            urlPrefix: '~/static/js'
        }
    },
    element: {
        //element主题 purple / orange / default
        theme: require('element-ui/lib/theme-chalk/index.css')
        // require('@css/theme/purple/index.css')
        // require('@css/theme/orange/index.css')
    },
    mint: true,
    router: {
        pc: {
            'base-name': 'pc',
            title: '惠咨询'
        },
        mobile: {
            'base-name': 'mobile'
        }
    }
}
