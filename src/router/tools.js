export default {
    init: () => {
        var indexRoutes = [];

        // 注册包中的store和getter
        const indexFiles = require.context('@views', true, /\/router\/index\.js$/);
        indexFiles.keys().forEach((modulePath) => {
            // const moduleName = modulePath.split('/').slice(-2, -1)[0];
            const value = indexFiles(modulePath);
            indexRoutes.push(value.default);
        });

        return indexRoutes
    }
}
