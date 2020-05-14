<template>
    <div class="pv-container">
        <img :src="src" ref="img" id="imageFullScreen"/>
    </div>
</template>

<script>
import '@/js/lib/e-smart-zoom-jquery.js'

export default {
    props: {
        src: {
            type: String,
            default: '',
            required: true
        }
    },
    data () {
        return {

        }
    },
    methods: {
        init() {
            $(this.$refs.img).smartZoom({
                containerClass: 'zoomable-container',
                width: '100%',
                height: '100%'
            });
        }
    },
    mounted: function() {
        this.init();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .pv-container{position:absolute; left:0; top:0; right:0; bottom:0;}
</style>
<style>
    .zoomable-container{
        background: #fff;
        background-image:
            linear-gradient(45deg, #FBFBFB 25%, transparent 0, transparent 75%, #FBFBFB 0),
            linear-gradient(45deg, #FBFBFB 25%, transparent 0, transparent 75%, #FBFBFB 0);
        background-position: 0 0, 15px 15px;
        background-size: 30px 30px;
    }
</style>
