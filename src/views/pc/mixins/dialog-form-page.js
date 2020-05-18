// my-dialog中包裹的form文件的mixin文件

export default {
    methods: {
        cancleHandler() {
            this.$emit('cancle');
        }
    }
}
