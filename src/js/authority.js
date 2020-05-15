import Vue from 'vue'
import store from '@store'

Vue.prototype.$au = {
    isAdmin() {
        return store.getters.user.isadmin === '1';
    },
    isAdder(row) {
        return store.getters.user.userid === row.adduserid;
    }
}
