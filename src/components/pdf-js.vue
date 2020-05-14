<template>
    <iframe
    ref="frame"
    class="pdf-container"
    :src="'./static/plugin/pdfjs/index.html?file=' + src + ts"></iframe>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        }
    },
    data () {
        return {

        }
    },
    computed: {
        ts() {
            return '&ts=' + new Date().getTime();
        }
    },
    watch: {
        src(n, o) {
            if(n != o && !n) {
                this.reload();
            }
        }
    },
    methods: {
        reload() {
            // this.$refs.frame.contentWindow.location.reload();
            // debugger
            //
            var pdfWin = this.$refs.frame.contentWindow;
            if (pdfWin.document.readyState === 'complete') {
                this.$refs.frame.contentWindow.webViewerLoad();
            } else {
                pdfWin.location.reload();
            };
        }
    },
    mounted: function() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .pdf-container{position:absolute; left:0; top:0; right:0; bottom:0; width:100%; height:100%; display:block;}
</style>
