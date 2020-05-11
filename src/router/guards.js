import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function(router) {
    router.beforeEach(function(to, from, next){
        NProgress.start();
        document.title = to.meta.title || '';
        next();
    });

    router.afterEach(function(){
        NProgress.done();
    });
}
