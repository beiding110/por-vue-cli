export default {
    state: {
        user: {
            name: 'yzh'
        }
    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        },
        setUser(state, n) {
            state.user = n
        }
    }
}