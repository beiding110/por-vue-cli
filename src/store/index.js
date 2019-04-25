import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        }
    }
})
