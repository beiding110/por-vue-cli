<template>
  <div class="pdf-container">
    <div class="top-bar">
      <el-input-number size="mini" v-model="scale" :min="0" :step="0.5"></el-input-number>
    </div>
    <div class="pdf-body">
      <canvas ref="pdf-canvas"></canvas>
    </div>
    <!-- <div class="foot" v-if='pdfDoc'>
            <button class='left' v-if="pageNum>1" @click="onPrevPage">上一页</button>
            <button class='right' v-if="pageNum<pdfDoc.numPages" @click="onNextPage">下一页</button>
        </div> -->
  </div>
</template>

<script>
  import PDFJS from 'pdfjs-dist'

  export default {
    props: {
      url: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        pdfDoc: null,
        pageNum: 1,
        pageRendering: false,
        pageNumPending: null,
        scale: 1
      }
    },
    watch: {
      scale(n, o) {
        this.zoomHandler(n);
      }
    },
    methods: {
      showPDF(url) {
        let _this = this
        PDFJS.getDocument(url).then(function (pdf) {
          _this.pdfDoc = pdf
          _this.renderPage(_this.pageNum, _this.scale)
        })
      },
      renderPage(num, scale) {
        this.pageRendering = true
        let _this = this
        this.pdfDoc.getPage(num).then(function (page) {
          var viewport = page.getViewport(scale)
          let canvas = _this.$refs['pdf-canvas']
          canvas.height = viewport.height
          canvas.width = viewport.width

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: canvas.getContext('2d'),
            viewport: viewport
          }
          var renderTask = page.render(renderContext)

          // Wait for rendering to finish
          renderTask.promise.then(function () {
            _this.pageRendering = false
            if (_this.pageNumPending !== null) {
              // New page rendering is pending
              this.renderPage(_this.pageNumPending)
              _this.pageNumPending = null
            }
          })
        })
      },
      queueRenderPage(num) {
        if (this.pageRendering) {
          this.pageNumPending = num
        } else {
          this.renderPage(num, this.scale)
        }
      },
      zoomHandler(scale) {
        if (scale) {
          this.renderPage(this.pageNum, scale)
        }
      },
      onPrevPage() {
        if (this.pageNum <= 1) {
          return
        }
        this.pageNum--
        this.queueRenderPage(this.pageNum)
      },
      onNextPage() {
        if (this.pageNum >= this.pdfDoc.numPages) {
          return
        }
        this.pageNum++
        this.queueRenderPage(this.pageNum)
      }
    },
    mounted: function () {
      this.url && this.showPDF(this.url);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .pdf-container {
    background-color: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .top-bar {
    background: #474747;
    width: 100%;
    padding: 5px 0;
  }

  .pdf-body {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .pdf-page {}

  .foot {
    position: fixed;
    transform: translate(-50%, 0);
    left: 50%;
  }
</style>