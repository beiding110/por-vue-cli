// list文件的mixin
//
export default {
    data: () => ({
        tableData: [],
        pgData: {

        }
    }),
    methods: {
        cancleHandler() {
            this.$emit('cancle');
        },
        reloadHandler() {
            this.$refs.page.reload();
        }
    }
}
