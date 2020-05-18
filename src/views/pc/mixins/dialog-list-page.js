// 带有my-dialog的list文件的mixin

export default {
    data: () => ({
        dialogVisible: false
    }),
    methods: {
        cancleHandler() {
            this.$emit('cancle');
        },
        formCancleHandler() {
            this.dialogVisible = false;
            this.reloadHandler();
        }
    }
}
