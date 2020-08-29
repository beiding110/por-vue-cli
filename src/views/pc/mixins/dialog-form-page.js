// my-dialog中包裹的form文件的mixin文件

export default {
    methods: {
        cancleHandler() {
            try{
                this.$refs.form.reset();
            } catch(e) {};
            this.$emit('cancle');
        }
    }
}
