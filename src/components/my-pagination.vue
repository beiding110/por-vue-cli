<template>
    <div :class="theme=='dark' ? '' : 'my__pagination'">
        <el-pagination layout="prev, pager, next" :total="total" :page-size="!!search ? search.pagesize || 10 : 10" :current-page.sync="currentPage" style="text-align:right; margin-top:1em;" @current-change="handleCurrentChange"></el-pagination>
    </div>
</template>

<script>
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default {
    props: {
        value: {
            type: Array,
            default() {
                return []
            }
        },
        action: {
            type: String,
            default: ''
        },
        search: {
            type: Object,
            default() {
                return {}
            }
        },
        currentChange: {
            type: Function,
            default: function(){}
        },
        afterQuery: {
            type: Function,
            default: function(){}
        },
        theme: {
            type: String,
            default: ''
        },
        lazy: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            total: 1,
            currentPage: 1
        }
    },
    computed: {
        pageData: {
            get: function () {
                return this.value
            },
            set: function (e) {
                this.$emit('input', e)
            }
        }
    },
    methods: {
        queryData: function (page) {
            var that = this;
            NProgress.start();
            this.$nextTick(function () {
                if (!that.action) {
                    throw new Error('请绑定action属性（数据api请求地址）');
                } else {
                    page = !!getHash('page') ? getHash('page') : (page || 1);

                    var searchData = {};
                    var searchData = this.search || {};

                    this.currentPage = page;
                    searchData.pageindex = page;
                    searchData.sortname = (!!searchData.sortname || searchData.sortname === '') ? searchData.sortname : 'addtime';
                    searchData.sortorder = searchData.sortorder || 'desc';

                    this.$ajax({
                        url: that.action,
                        data: searchData,
                        callback: (data, res) => {
                            !!this.afterQuery && this.afterQuery(data.rows, data);
                            that.pageData = data.rows;
                            that.$nextTick(function() {
                                that.total = data.total;
                            });

                            this.$emit('update:extra', data.extra);
                        },
                        complete() {
                            NProgress.done();
                        }
                    });
                }
            })
        },
        handleCurrentChange: function (e) {
            !!this.currentChange && this.currentChange();
            this.$emit('currentChange', e);
            this.queryData(e);
        },
        reload: function () {
            this.queryData(this.currentPage);
        }
    },
    mounted: function() {
        !inAttr(this.lazy) && this.queryData(1)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    /* .my__pagination{padding: 0 2em 2em;} */
    .my__pagination .el-pager li.active{color:#FFCC55;}
    .my__pagination .el-pager li, .my__pagination .el-pagination button:disabled, .my__pagination .el-pagination .btn-next, .my__pagination .el-pagination .btn-prev{background: rgba(0,0,0,0);}
    /* .my__pagination .el-pagination .btn-next, .my__pagination .el-pagination .btn-prev{color:white;} */
    .my__pagination .el-pagination button:hover{color:#FFCC55;}
    .my__pagination .el-pagination{color: #888;}
</style>
