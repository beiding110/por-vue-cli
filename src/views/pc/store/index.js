export default {
    state: {
        twUrl: '/pms/teamwork',
        sysUrl: '/pms'
    },
    getters: {

    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        }
    }
}
