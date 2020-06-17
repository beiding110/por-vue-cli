<template>
    <div class="layout" :class="{mobile:mobile, 'view-only':viewOnly}">
        <div class="left-nav-cover" v-if="showController" @click="toggleShowController"></div>
        <div class="left-nav" :class="{collapse:collapseController, show:showController}" v-if="!viewOnly">
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
    <div class="top-nav" :class="{collapse:collapseController}" v-if="!viewOnly">
        <div class="btn-coll btn_top-nav" @click="toggleCollapse" v-if="!mobile">
            <i :class="{'el-icon-s-fold':!collapseController,'el-icon-s-unfold':collapseController}"></i>
        </div>
        <div class="btn-coll btn_top-nav" @click="toggleCollapse" v-else>
            <i class="el-icon-s-unfold"></i>
        </div>
        <div class="btn-back btn_top-nav circle" @click="goBack">
            <i class="el-icon-back"></i>
        </div>

        <my-breadcrumb></my-breadcrumb>
    </div>
    <div class="view" :class="{collapse:collapseController}" id="view-content">
        <router-view :key="$route.fullPath" />
    </div>
</div>
</template>

<script>
import MyBreadcrumb from './components/breadcrumb'

export default {
    components: {MyBreadcrumb},
    data () {
        return {
            collapseController: false,
            showController: false,
            menuList: [],
            mobile: false,
            viewOnly: false
        }
    },
    methods: {
        queryMenu() {
            this.$get(this.getGetters('sysUrl') + '/menu/list', function (data) {
                this.menuList = data;
            })
        },
        toggleCollapse() {
            if(this.mobile) {
                this.toggleShowController();
                return;
            };
            this.collapseController = !this.collapseController;
        },
        toggleShowController() {
            this.showController = !this.showController;
        },
        goBack() {
            this.$router.go(-1);
        },
        resizeHandler() {
            if(window.innerWidth < 1000) {
                this.mobile = true;
            } else {
                this.mobile = false;
            };
        }
    },
    mounted: function() {
        window.addEventListener('resize', this.resizeHandler);

        // this.queryMenu();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler);
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
    .top-nav{height:50px; position:absolute; left:$leftWidth; top:0; right:0; box-shadow:0 1px 4px rgba(0,21,41,.08); transition:all .3s; overflow:hidden;
        &.collapse{left:$colLeftWidth;}

        .btn_top-nav{cursor:pointer; height:100%; display:inline-block; line-height:50px; padding:0 1em; float:left; transition:.2s all;
            &:hover{background:#efefef;}
            i{font-size:22px;}
            &.circle{border-radius:50%; width:2em; height:2em; line-height:2em; text-align:center; padding:0; margin-top:9px;}
        }
    }
    .view{position:absolute; left:$leftWidth; top:50px; right:0; bottom:0; padding:10px; overflow:auto; transition:all .3s;
        &.collapse{left:$colLeftWidth;}
    }
}

.layout.mobile{
    .left-nav-cover{position:absolute; left:0; right:0; top:0; bottom:0; background:rgba(0,0,0,.3); z-index:998;}
    .left-nav{transform:translateX(-$leftWidth); z-index:999;
        &.show{transform:translateX(0);}
    }
    .top-nav{left:0;}
    .view{left:0;}
}

.layout.view-only{
    .view{left:0; top:0;}
}
</style>
