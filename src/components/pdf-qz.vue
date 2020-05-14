<template>
    <div>
        <embed ref="pdf" :src="onlineObj.src" class="pdf-container" type="application/pdf" width="100%" height="100%"/>

        <div class="upload" v-if="!onlineObj.src">文件生成中...</div>

        <div style="text-align:center;" class="pdf-btn">
            1、
            <el-button @click="SelectStp('公章')" style="margin:0 10px;">公章</el-button>
            2、
            <el-button @click="SelectStp('法人章')" style="margin:0 10px;">法人章</el-button>

            <el-button @click="resetQz">重新生成</el-button>
        </div>


        <div style="display: none;">
            <!-- 是否SM2算法 -->
            isSM2:<input type="text" id="isSM2" />
            <!-- 签章Base64 -->
            sealImg:<input type="text" id="sealImg" />
            <!-- Pdf摘要 -->
            hash:<input type="text" id="hash" />
            <!-- PKCS#7 -->
            signature:<input type="text" id="signature" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        onlineObj: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            type: '',
            sealName: '',
            rowguid: '',
            loading: false,
            regenerate: ''
        }
    },
    computed: {
        ts() {
            return '&ts=' + new Date().getTime();
        }
    },
    watch: {
        src(n, o) {
            if (n != o) {
                this.reload();
            }
        }
    },
    methods: {
        resetQz() {
            this.onlineObj.regenerate = '1';

            this.$post('/bhtong/office/guarantee/cagetpdffile.json', {
                rowguid: this.onlineObj.rowguid,
                regenerate: '1'
            }, function (data) {
                this.$nextTick(function () {
                    ShowMsg.call(this, '重新生成成功', 'success');
                    this.$refs.pdf.src = data.fileurl;
                })
            })
        },
        reload() {
            this.$refs.frame.contentWindow.Init();
        },

        /**
        * 选择印章
        */
        SelectStp: function (sealName) {
            this.sealName = sealName;
            try {
                SelectStamp(this.SelectStampcallback);
            } catch (e) {
                console.log(e);
            }
        },

        /**
        * SelectStamp接口回调，用户选择印模，返回印模相关信息:
        * boolean success: true表示操作执行成功
        * string error: 操作执行失败时的错误信息
        * string stamp: 已经选择的印模Base64字符串
        * int isSM2: 是否SM2证书，1标识SM2，0标识非SM2
        */
        SelectStampcallback: function (success, error, stamp, isSM2) {
            if (success) {
                $("#isSM2").val(isSM2);
                $("#sealImg").val(stamp);
                if (this.sealName === '法人章') {
                    this.onlineObj.regenerate = '0'
                }
                var params = {
                    "isSM2Cert": $("#isSM2").val(),
                    "sealImg": $("#sealImg").val(),
                    sealName: this.sealName,
                    rowguid: this.onlineObj.rowguid,
                    regenerate: this.onlineObj.regenerate
                };
                //获取pdf文件hash
                this.$post('/bhtong/office/guarantee/cagetfilehash.json', params, function (data, res) {
                    if (res.code == 'v') {
                        var fileHash = data.filehash;
                        $("#hash").val(fileHash);
                        //根据摘要生成签章结果
                        SealHash(fileHash, this.SealHashcallback);
                    } else {
                        ShowMsg.call(this, data.msg)
                    }
                });
            } else {
                ShowMsgBox.call(this, '未找到CA锁，请插入！', 'success');
            }
        },

        /**
        * SealHash接口回调，根据摘要生成签章结果:
        * boolean success: true表示操作执行成功
        * string error: 操作执行失败时的错误信息
        * string result: 签章结果的Base64字符串
        */
        SealHashcallback: function (success, error, result) {
            if (success) {
                $("#signature").val(result);
                //合并pdf签章
                this.MergePdfSeal();
            } else {
                // ShowMsgBox(error);
            }
        },

        /* 合并pdf签章 */
        MergePdfSeal: function () {
            var params = {
                "fileguid": this.onlineObj.fileguid,
                "signature": $("#signature").val()
            };

            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            this.$post('/bhtong/office/guarantee/camergepdfseal.json', params, function (data, res) {
                console.log(res)
                if (res.code == 'v') {
                    ShowMsg.call(this, '签章成功。')

                    this.$nextTick(function () {
                        this.$refs.pdf.src = data;
                    })
                    loading.close();
                } else {
                    ShowMsg.call(this, '签章失败。')
                    loading.close();
                }
            });
        }
    },
    mounted: function () {
        initHebcaWebPDF();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pdf-container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 90%;
    display: block;
}

.upload {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
}

.pdf-btn {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translate(-50%)
}
</style>
