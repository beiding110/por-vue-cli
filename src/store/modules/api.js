import apiMap from '@/api'

export default {
    state: apiMap,
    getters: {

    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        }
    }
}
