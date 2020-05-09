export default {
    state: {
        user: {}
    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        }
    }
}
