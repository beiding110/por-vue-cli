<template>
    <script id="" name="_UEditor" type="text/plain" class="my-ueditor" style="height:300px;" ref="_UEditor"></script>
</template>

<!-- <script type="text/javascript" charset="utf-8" src="/agency/uedtior/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/agency/uedtior/ueditor.all.min.js"> </script> -->

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
                    ['fullscreen', 'source', 'undo', 'redo', 'fontfamily', 'fontsize', 'forecolor', 'bold', 'italic', 'underline', 'justifyleft', 'justifycenter',
                        'justifyright', 'justifyjustify', 'backcolor', 'inserttable', 'inserttable', 'link', 'preview', 'unlink', 'inserttitle', 'date', 'time', 'formatmatch',
                        'simpleupload', 'insertimage'
                    ]
                ],
                wordCount: false
            })
        }
    },
    data () {
        return {
            ue: null
        }
    },
    watch: {
        value: function (nv, ov) {
            if (!ov && nv) {
                try {
                    this.ue.setContent(nv);
                    this.ue.focus(true);
                } catch (e) {}
            } else if (!nv && ov) {
                try {
                    this.ue.setContent(nv);
                } catch (e) {}
            }
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            var config = this.config;

            var dom = this.$refs["_UEditor"]
            var randomID = '_UEditor-' + Math.floor(Math.random() * 10000);
            dom.setAttribute('id', randomID)

            this.ue = UE.getEditor(randomID, config);

            var that = this;
            this.ue.addListener("ready", function () {
                that.ue.setContent(that.value || ""); // 确保UE加载完成后，放入内容。
                that.ue.addListener("contentChange", function () {
                    that.$emit("input", that.ue.getContent());
                });
            });
        })
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .my-ueditor .edui-toolbar{line-height:1em;}
</style>
