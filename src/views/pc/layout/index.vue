<template>
    <div class="layout">
        <div class="left-nav" :class="{collapse:collapseController}">
            <el-menu
            router
            :collapse="collapseController"
            background-color="#304156"
            text-color="#BFCBD9"
            active-text-color="#ffd04b"
            default-active="2">
                <my-nav-menu :list="menuList"></my-nav-menu>
            </el-menu>
        </div>
        <div class="top-nav" :class="{collapse:collapseController}">
            <div class="btn-coll" @click="toggleCollapse">
                <i :class="{'el-icon-s-fold':!collapseController,'el-icon-s-unfold':collapseController}"></i>
            </div>
        </div>
        <div class="view" :class="{collapse:collapseController}" id="view-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            collapseController: false,
            menuList: []
        }
    },
    methods: {
        queryMenu() {
            this.$get(this.getGetters('sysUrl') + '/menu/list', function (data) {
                this.menuList = data;
            })
        },
        toggleCollapse() {
            this.collapseController = !this.collapseController;
        }
    },
    mounted: function() {
        // this.queryMenu();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$leftWidth: 200px;
$colLeftWidth: 64px;

.layout{position:relative; width:100%; height:100%;
    .left-nav{width:$leftWidth; height:100%; position:absolute; left:0; top:0; background:#304156; transition:all .3s; overflow-x:hidden;
        &.collapse{width:$colLeftWidth;
            /deep/ .el-menu .infinite-sub-menu .el-menu-item span{display:none;}
        }
        .el-menu{border:none;}
        /deep/ .el-menu--collapse .el-submenu>.el-submenu__title {
            span{ height: 0; width: 0; overflow: hidden; visibility: hidden; display: inline-block;}
            .el-submenu__icon-arrow{display:none;}
        }
    }
    .top-nav{height:50px; position:absolute; left:$leftWidth; top:0; right:0; box-shadow:0 1px 4px rgba(0,21,41,.08); transition:all .3s;
        &.collapse{left:$colLeftWidth;}

        .btn-coll{cursor:pointer; height:100%; display:inline-block; line-height:50px; padding:0 1em;
            &:hover{background:#efefef;}
            i{font-size:22px;}
        }
    }
    .view{position:absolute; left:$leftWidth; top:50px; right:0; bottom:0; padding:10px; overflow:auto; transition:all .3s;
        &.collapse{left:$colLeftWidth;}
    }
}


</style>
