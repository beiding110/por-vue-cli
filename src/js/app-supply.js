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
     * 获取$store.getters中的变量
     * @param  {key} key 变量关键字
     * @return {all}     获取到的变量
     */
    owner.getGetters = function(key) {
        return this.$store.getters[key] || false;
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

    /**
    * 生成表单校验规则
    * @return {Object} 生成的校验规则
    */
   owner.newRule = function() {
       let arg = [], rules = [];
       arg = Array.prototype.slice.apply(arguments);
       let label = arg.splice(0, 1),
           changeState = false;

       const typeMap = {
           string: '字符串',
           number: '数字',
           boolean: '布尔',
           method: '方法',
           regexp: '正则',
           integer: 'integer',
           float: '浮点数',
           array: '数组',
           object: '对象',
           enum: 'enum',
           date: '日期',
           url: 'url地址',
           hex: '哈希',
           email: '电子邮件'
       }

       arg.forEach(function(item) {
           if(item === 'change') {
               changeState = true;
           }

           if(item === 'required') {
               rules.push.apply(rules, [{
                   required: true,
                   message: '请输入' + label,
                   trigger: ['blur']
               }, {
                   validator(rules, value, callback) {
                       if(typeof value === 'string') {
                           if(!value.replace(/^\s+|\s+$/g,"")) {
                               return callback(new Error('内容不能为空格'))
                           }
                       }
                       callback();
                   },
                   trigger: ['blur']
               }])
           };

           if (/min/.test(item)) {
               let length = item.split('min')[1];
               rules.push({
                   min: parseInt(length),
                   message: '至少输入' + length + '个字符',
                   trigger: 'blur'
               });
           };

           if (/max/.test(item)) {
               let length = item.split('max')[1];
               rules.push({
                   max: parseInt(length),
                   message: '至多输入' + length + '个字符',
                   trigger: ['blur']
               });
           };

           if(item === 'mobile') {
               rules.push({
                   validator(rules, value, callback) {
                       if (!/^[1][0-9]{10}$/.test(value)) {
                           return callback(new Error('手机号格式错误'));
                       }
                       callback();
                   },
                   trigger: ['blur']
               })
           };

           Object.keys(typeMap).forEach(function(key, index) {
               if(item === key) {
                   rules.push({
                       type: key,
                       message: '请输入正确的' + typeMap[key] + '格式',
                       trigger: ['blur']
                   })
               }
           });
       });

       if(changeState) {
           rules.forEach((item) => {
               item.trigger.push('change');
           })
       }

       return rules
   }

})(Vue.prototype)
