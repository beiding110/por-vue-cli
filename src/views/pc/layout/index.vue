<template>
    <div class="layout">
        <div class="left-nav">
            <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            default-active="2"
            class="el-menu-vertical-demo">
                <my-nav-menu :list="menuList"></my-nav-menu>
            </el-menu>
        </div>
        <div class="view">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menuList: []
        }
    },
    methods: {
        queryMenu() {
            this.$get(this.getGetters('sysUrl') + '/menu/list', function (data) {
                this.menuList = data;
            })
        }
    },
    mounted: function() {
        this.queryMenu();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.layout{position:relative; width:100%; height:100%;
    .left-nav{width:200px; height:100%; position:absolute; left:0; top:0; background:#545c64;
        .el-menu{border:none;}
    }
    .view{position:absolute; left:200px; top:0; right:0; bottom:0; padding:10px;}
}
</style>
