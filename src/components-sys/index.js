export default{
    install: function(Vue){
        Vue.component('zh-action-row', function(){return import(/*webpackChunkName: 'coms-sys'*/ './zh-action-row')});
    }
}
