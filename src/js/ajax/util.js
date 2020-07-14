export default {
    throwError({settings, obj, msg}) {
        var json = {
            msg: msg || `ajax code: ${obj.code}`,
            req: settings,
            res: obj
        };
        throw new Error(JSON.stringify(json));
    }
}
