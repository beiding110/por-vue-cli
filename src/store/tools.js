function mixin(obj, target, state) {
    obj = obj || {};
    Object.keys(obj).forEach(function (key) {
        if (state) {
            target[key] = obj[key];
        } else {
            if (!target[key])
                target[key] = obj[key];
        }
    });
    return target;
};

export default {
    mixin,
    init: ({modules, getter, indexSrc, gettersSrc}) => {
        var getters_res = {},
            modules_res = {};
        mixin(getter, getters_res);
        modules.forEach(item => {
            mixin(item, modules_res);
        });

        // 注册包中的store和getter
        const indexFiles = require.context(indexSrc[0], true, indexSrc[1]);
        const moduleIndexs = indexFiles.keys().reduce((modules, modulePath) => {
            // set './app.js' => 'app'
            const moduleName = modulePath.split('/').slice(-3, -2)[0]
            const value = indexFiles(modulePath)
            modules[moduleName] = value.default
            return modules
        }, {});
        mixin(moduleIndexs, modules_res);

        const gettersFiles = require.context(gettersSrc[0], true, gettersSrc[1]);
        const moduleGetters = gettersFiles.keys().reduce((modules, modulePath) => {
            // set './app.js' => 'app'
            const moduleName = modulePath.split('/').slice(-3, -2)[0]
            const value = gettersFiles(modulePath)
            mixin(value.default, modules)
            return modules
        }, {});
        mixin(moduleGetters, getters_res);

        return {
            modules_res,
            getters_res
        }
    }
}
