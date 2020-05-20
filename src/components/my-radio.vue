<template>
    <span class="my__radio">
        <el-radio-group v-model="model" v-if="!readonly">
            <template v-for="item in list">
               <el-radio :label="item[props.value]">{{item[props.label]}}</el-radio>
            </template>
            <slot>

            </slot>
        </el-radio-group>
        <template v-else>
            {{selectedLabel}}
        </template>
    </span>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        action: {
            type: String,
            default: ''
        },
        data: {
            type: Array,
            default() {
                return []
            }
        },
        props: {
            type: Object,
            default() {
                return {
                    value: 'key',
                    label: 'value'
                }
            }
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            list: [],
        }
    },
    computed: {
        model: {
            get: function () {
                return this.value;
            },
            set: function (val) {
                this.$emit('input', val);
            }
        },
        selectedLabel() {
            return this.list.reduce((res, item) => {
                if(item[this.props.value] === this.value) res = item[this.props.label];
                return res
            }, '');
        }
    },
    watch: {
        data: {
            handler: function (n, o) {
                if (n != o) {
                    this.list = n
                }
            },
            deep: true
        }
    },
    methods: {
        queryData: function () {
            if (!!this.action) {
                this.$get(this.action, function (data) {
                    this.list = data;
                })
            } else {
                this.list = this.data;
            }
        }
    },
    mounted: function () {
        this.queryData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .my__radio{}

    @media screen and (max-width:500px) {
        .my__radio{
            /deep/ .el-radio{margin-left:0; margin-right:1em;}
        }
    }
</style>
