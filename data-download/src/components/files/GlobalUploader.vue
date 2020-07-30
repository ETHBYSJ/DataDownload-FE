<template>
  <div id="global-uploader">
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="false"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-error="onFileError"
      class="uploader-app">
      <uploader-unsupport></uploader-unsupport>
      <uploader-btn id="global-uploader-btn" ref="uploadBtn">{{$t('m.Choose_File')}}</uploader-btn>
      <uploader-list v-show="panelShow">
        <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
          <div class="file-title">
            <h2>{{$t('m.File_List')}}</h2>
            <div class="operate">
              <el-button @click="fileListShow" type="text" :title="collapse ? $t('Collapse') : $t('Fold')">
                <!--
                <i class="iconfont" :class="collapse?'inuc-fullscreen':'inuc-minus-round'"></i>
                -->
                <!--
                <i class="collapse ? 'el-icon-full-screen' : 'el-icon-minus'"></i>
                -->
                <i v-if="collapse" class="el-icon-full-screen"></i>
                <i v-else class="el-icon-minus"></i>
              </el-button>
              <el-button @click="close" type="text" title="$t('m.Close')">
                <!--
                <i class="iconfont icon-close"></i>
                -->
                <i class="el-icon-close"></i>
              </el-button>
            </div>
          </div>
          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
            </li>
            <div class="no-file" v-if="!props.fileList.length">
              <!--
              <i class="iconfont icon-empty-file"></i>
              -->
              <i class="el-icon-folder-add"></i>
              {{$t('No_File')}}
            </div>
          </ul>
        </div>


      </uploader-list>
    </uploader>
  </div>
</template>

<script>
  import api from '../../api'
  import SparkMD5 from 'spark-md5'
  import Bus from '../../utils/bus'
  import $ from 'jquery'
  export default {
    // TODO 上传文件名不允许包括下划线！
    name: 'GlobalUploader',
    data() {
      // let that = this
      return {
        params: {},
        options: {
          // target: 'http://127.0.0.1:8080/api/v1/file/chunk',
          target: '/api/v1/file/chunk',
          chunkSize: '2048000',
          fileParameterName: 'file',
          maxChunkRetries: 3,
          testChunks: true, //是否开启服务器分片校验
          // 服务器分片校验函数
          checkChunkUploadedByResponse: function(chunk, message) {
            // 返回true则只发送一次GET请求，不会实际发送文件分块
            let res = JSON.parse(message)
            // console.log("message = " + message)
            // console.log(chunk)
            if(res.skipUpload) {
                return true
            }
            return (res.uploaded || []).indexOf(chunk.offset + 1) >= 0
          },
          headers: {
            // Authorization: document.cookie
          },
          query() {
            // 可以携带额外的参数,POST和GET均会携带这个参数
          }
        },
        panelShow: false,  // 选择文件后，展示上传panel
        collapse: false
      }
    },
    mounted() {
      Bus.$on('openUploader', query => {
        this.params = query || {}
        if(this.$refs.uploadBtn) {
          $('#global-uploader-btn').click()
        }
      })
    },
    computed: {
      uploader() {
        return this.$refs.uploader
      }
    },
    destroyed() {
      Bus.$off('openUploader')
    },
    methods: {
      onFileAdded(file) {
        this.panelShow = true
        this.computeMD5(file)
        Bus.$emit('fileAdded')
      },
      onFileProgress(rootFile, file, chunk) {
        // console.log(`上传中 ${file.name}, chunk: ${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
      },
      onFileSuccess(rootFile, file, response, chunk) {
        // 所有分块上传成功后的回调函数
        // console.log("onFileSuccess")
        let res = JSON.parse(response)
        console.log(response)
        // 服务器自定义的错误
        if(res.code !== 0) {
          this.$error(this.$t('Upload_Failed'))
          this.statusRemove(file.id)
          this.statusSet(file.id, 'failed')
          return
        }
        // 如果服务器返回需要合并
        if(res.data.needMerge) {
          this.statusRemove(file.id)
          this.statusSet(file.id, 'merging')
          let params = {
            filename: res.data.filename,
            relativePath: res.data.relativePath,
            identifier: res.data.identifier,
            totalChunks: res.data.totalChunks
          }
          api.files.merge(params).then(res => {
            // console.log(res)
            if(res.data.code === 0) {
              Bus.$emit('fileSuccess')
              this.statusRemove(file.id)
            }
            else {
              this.statusRemove(file.id)
              this.statusSet(file.id, 'failed')
              this.$error(this.$t('m.Merge_Error'))
            }
          }).catch(() => {
            this.statusRemove(file.id)
            this.statusSet(file.id, 'failed')
            this.$error(this.$t('m.Merge_Error'))
          })
        }

      },
      onFileError(rootFile, file, response, chunk) {
        this.$error(this.$t('m.Upload_Error'))
      },
      // 计算MD5
      computeMD5(file) {
        let fileReader = new FileReader()
        let time = new Date().getTime()
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        let currentChunk = 0
        const chunkSize = 10 * 1024 * 1000
        let chunks = Math.ceil(file.size / chunkSize)
        let spark = new SparkMD5.ArrayBuffer()
        // 文件状态设置为计算MD5
        this.statusRemove(file.id)
        this.statusSet(file.id, 'md5')
        file.pause()

        loadNext()
        fileReader.onload = (e => {
          spark.append(e.target.result)
          if(currentChunk < chunks) {
            currentChunk++
            loadNext()
            // 实时展示MD5计算进度
            this.$nextTick(() => {
              $(`.myStatus_${file.id}`).text(this.$t('m.CheckMD5') + ((currentChunk / chunks) * 100).toFixed(0) + '%')
            })
          }
          else {
            let md5 = spark.end()
            this.computeMD5Success(md5, file)
            // console.log(`MD5计算完毕: ${file.name} \nMD5: ${md5} \n分片: ${chunks} 大小: ${file.size} 用时: ${new Date().getTime() - time} ms`)
          }
        })
        fileReader.onerror = function() {
          this.$error(this.$t('m.File_Read_Error'))
          file.cancel()
        }
        function loadNext() {
          let start = currentChunk * chunkSize
          let end = ((start + chunkSize) >= file.size ? file.size : start + chunkSize)
          fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end))
        }
      },
      computeMD5Success(md5, file) {
        let path = this.$route.path
        if(path.startsWith('/files')) {
            path = path.substring(6)
        }
        if(path !== '/' && path[path.length - 1] === '/') {
          path = path.substring(0, path.length - 1)
        }
        file.relativePath = path
        // console.log(md5)
        file.uniqueIdentifier = md5
        file.resume()
        this.statusRemove(file.id)
      },
      fileListShow() {
        let $list = $('#global-uploader .file-list')
        if($list.is(':visible')) {
          $list.slideUp()
          this.collapse = true
        }
        else {
          $list.slideDown()
          this.collapse = false
        }
      },
      close() {
        this.$refs.uploader.uploader.cancel()
        this.panelShow = false
      },
      statusSet(id, status) {
        let statusMap = {
          md5: {
            text: this.$t('m.CheckMD5'),
            bgc: '#fff'
          },
          merging: {
            text: this.$t('m.Merging'),
            bgc: '#e2eeff'
          },
          failed: {
            text: this.$t('m.Upload_Failed'),
            bgc: 'e2eeff'
          }
        }
        this.$nextTick(() => {
          $(`<p class="myStatus_${id}"></p>`).appendTo(`.file_${id} .uploader-file-status`).css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'right': '0',
            'bottom': '0',
            'zIndex': '1',
            'backgroundColor': statusMap[status].bgc
          }).text(statusMap[status].text);
        })
      },
      statusRemove(id) {
        this.$nextTick(() => {
          // 移除组件内部自带的状态
          $($(`.file_${id} .uploader-file-status`).children().get(0)).text('')
          $(`.myStatus_${id}`).remove()
        })
      },

    }

  }
</script>

<style scoped lang="less">
  #global-uploader {
    position: fixed;
    z-index: 20;
    right: 15px;
    bottom: 15px;

    .uploader-app {
      width: 520px;
    }

    .file-panel {
      background-color: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 7px 7px 0 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);

      .file-title {
        display: flex;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        border-bottom: 1px solid #ddd;

        .operate {
          flex: 1;
          text-align: right;
        }
      }

      .file-list {
        position: relative;
        height: 240px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #fff;

        > li {
          background-color: #fff;
        }
      }

      &.collapse {
        .file-title {
          background-color: #E7ECF2;
        }
      }
    }

    .no-file {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
    }
    /*
    /deep/.uploader-file-icon {
      &:before {
        content: '' !important;
      }

      &[icon=image] {
        background: url(./images/image-icon.png);
      }
      &[icon=video] {
        background: url(./images/video-icon.png);
      }
      &[icon=document] {
        background: url(./images/text-icon.png);
      }
    }

    /deep/.uploader-file-actions > span {
      margin-right: 6px;
    }
    */
  }

  /* 隐藏上传按钮 */
  #global-uploader-btn {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
</style>
