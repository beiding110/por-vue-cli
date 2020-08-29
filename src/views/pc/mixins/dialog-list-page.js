// 带有my-dialog的list文件的mixin

export default {
    data: () => ({
        dialogVisible: false,

        form: {}
    }),
    watch: {
        dialogVisible(n) {
            if(!n){
                try{
                    this.reloadHandler();
                } catch(e) {};
            };
        }
    },
    methods: {
        dialogShow() {
            this.dialogVisible = true;
        },
        editHandler(row) {
            this.form = clone(row);
            this.dialogVisible = true;
        },
        cancleHandler() {
            this.$emit('cancle');
        },
        dialogClose() {
            this.dialogVisible = false;
        }
    }
}
