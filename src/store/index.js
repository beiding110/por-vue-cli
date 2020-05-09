import Vue from 'vue'
import Vuex from 'vuex'
import _ from './tools.js'

import user from './modules/user.js'
import globalGetters from './getters.js'

// const {modules, getters} = _.init({
//     modules: [user],
//     getter: globalGetters,
//     indexSrc: ['@views', /store\/index\.js$/],
//     gettersSrc: ['@views', /store\/getters\.js$/]
// });

var getters = {},
modules = {};
_.mixin(globalGetters, getters);
_.mixin({user}, modules);

// 注册包中的store和getter
const indexFiles = require.context('@views', true, /store\/index\.js$/);
const moduleIndexs = indexFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.split('/').slice(-3, -2)[0]
    const value = indexFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {});
_.mixin(moduleIndexs, modules);

const gettersFiles = require.context('@views', true, /store\/getters\.js$/);
const moduleGetters = gettersFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.split('/').slice(-3, -2)[0]
    const value = gettersFiles(modulePath)
    _.mixin(value.default, modules)
    return modules
}, {});
_.mixin(moduleGetters, getters);

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    getters,
    mutations: {
        setState: function(state, n){
            mixin(n, state, true);
        }
    },
    modules
});
