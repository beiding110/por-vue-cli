<template>
    <div>
        <script
            v-if="!readonly"
            id=""
            name="_UEditor"
            type="text/plain"
            class="my-ueditor"
            style="height:300px;"
            ref="_UEditor"
        ></script>
        <div
            v-if="readonly"
            v-html="value"
            class="ueditor-readonly"
        ></div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        config: {
            type: Object,
            default: () => ({
                toolbars: [
                    [
                        'fullscreen', 'source', 'undo', 'redo', 'fontfamily', 'fontsize', 'forecolor', 'bold', 'italic', 'underline', 'justifyleft', 'justifycenter',
                        'justifyright', 'justifyjustify', 'backcolor', 'inserttable', 'inserttable', 'link', 'preview', 'unlink', 'inserttitle', 'date', 'time', 'formatmatch',
                        'simpleupload', 'insertimage'
                    ]
                ],
                wordCount: false
            })
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            ue: null,

            content_inner: ''
        }
    },
    watch: {
        value(n, o) {
            if(n !== this.content_inner && this.ue && n) {
                this.ue.setContent(n);
            };
        }
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.content_inner = val;
                this.$emit("input", val);
            }
        },
    },
    methods: {
        getUEContent: function () {
            //return this.ue.getContent()
            return $(this.$refs.editor.$el).find('iframe[id^="ueditor_"]')[0].contentDocument.body.innerHTML;
        },
        setUEContent: function (content) {
            $(this.$refs.editor.$el).find('iframe[id^="ueditor_"]')[0].contentDocument.body.innerHTML = content;
        },
        resetUEContent: function () {
            if (this.ue.hasContents()) {
                this.ue.setContent("");
            }
        }
    },
    mounted: function () {
        if(this.readonly) return;
        this.$nextTick(function () {
            var config = this.config;

            var dom = this.$refs["_UEditor"];
            var randomID = '_UEditor-' + Math.floor(Math.random() * 10000);
            dom.setAttribute('id', randomID);

            this.ue = UE.getEditor(randomID, config);
            this.value && this.ue.setContent(this.value);

            var that = this;
            this.ue.addListener("ready", function () {
                that.ue.setContent(that.model || ""); // 确保UE加载完成后，放入内容。
                that.ue.addListener("contentChange", function () {
                    var htmlContent = that.ue.getContent();
                    that.model = htmlContent;
                });
            });
        })
    },
    beforeDestroy() {
        this.ue && this.ue.destroy();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .my-ueditor .edui-toolbar{line-height:1em;}
    .ueditor-readonly{
        *{max-width:100%;}
    }
</style>
