import Vue from 'vue'
(function(owner) {
    /**
     * 获取路由中参数
     * @param  {String} key 参数关键字
     * @return {String}     获取到的参数
     */
    owner.getRoute = function(key) {
        return this.$route.params[key];
    };
    owner.getQuery = function(key) {
        return this.$route.query[key];
    };

    /**
     * 获取$store中的变量
     * @param  {key} key 变量关键字
     * @return {all}     获取到的变量
     */
    owner.getStore = function(key) {
        return this.$store.state[key] || false;
    };

    /**
     * 设定$store中的变量
     * @param  {Object} obj 变量的key、value集合
     * @return {null}     返回空
     */
    owner.setStore = function(key, value) {
        var obj = {};
        if(typeof(key) === 'string') {
            obj[key] = value;
        } else if (typeof(key) === 'object') {
            obj = key;
        }
        this.$store.commit('setState', obj)
    };

    /**
     * 跳转（有历史记录）
     * @return {null} 无返回值
     */
    owner.goto = function() {
        this.$router.push.apply(this.$router, arguments);
    };

    /**
     * 参数是否存在
     * @param  {String} e 参数名
     * @return {Boolean}   是否存在
     */
    owner.inAttr = function(e) {
        return inAttr(e);
    };

    /**
     * 切除日期中的时分秒
     * @param  {String} e 日期字符串
     * @return {String}   切分后的年月日
     */
    owner.timeToDate = function(e) {
        return timeToDate(e);
    };

})(Vue.prototype)
