<template>
  <div class="item" :class="[show?'line-in':'line']"
    @click.prevent.stop="open"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <!--icon-->
    <div class="img">
      <div class="img-inner">
          <div class="img-wrapper">
            <img :src="imgUrl" @mousedown.prevent/>
          </div>
      </div>
    </div>
    <div class="name">
      <div class="name-inner">{{name}}</div>
    </div>
    <div class="discription">
      <ul>
        <li><i class="el-icon-circle-check"></i>aaa</li>
        <li><i class="el-icon-circle-check"></i>bbb</li>
        <li><i class="el-icon-circle-check"></i>ccc</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../../api'
  import filesize from 'filesize'
  import {mapGetters} from 'vuex'

  export default {
    name: 'BlockItem',
    components: {

    },
    data: function() {
      return {
        dialogVisible: false,
        visibility: 'visibility: hidden',
        show: false,

        downloadActive: false,
      }
    },
    computed: {
        ...mapGetters(['user']),
    },
    mounted() {

    },
    props: ['fileId', 'name', 'path', 'ownerId', 'imgUrl'],
    watch: { 
      'show'(val) {
        if(val) {
          this.visibility = 'visibility: visible'
        }
        else {
          this.visibility = 'visibility: hidden'
        }
      },
    },
    methods: {
 
      open() {
        // 转到某个数据包的介绍页面

      },

      handleMouseEnter() {
        this.show = true
      },
      handleMouseLeave() {
        if(!this.isEditing) {
          this.show = false
        }
      },
      // 下载(仅限文件)
      doDownload() {
        let data = {
          name: this.name,
          path: this.path
        }
        api.files.download(data).then(res => {
          this.dialogVisible = false

          let link = document.createElement('a')
          let blob = new Blob([res.data], {type: 'octet/stream'})
          link.download = this.oldName
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()

          // let blob = new Blob([res.data])
          // saveAs(blob, this.oldName)

        }).catch(() => {
          this.dialogVisible = false
          this.$error(this.$t('m.Download_Error'))
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .item {
    display: inline-block;
    height: 360px;
    width: 280px;
    margin: 10px;
    border: 1px solid rgba(187, 187, 187, 0.5);
    .img {
      width: 280px;
      height: 180px;
      .img-inner{
        position: relative;
        width: 100%;
        overflow: hidden;
        height: 180px;
        .img-wrapper{
          position: absolute;
          width: 692px;
          height: 300px;
          left: 50%;
          margin-left: -386px;
          top: -50%;
        }
      }
    }
    .name {
      height: 40px;
      width: 200px;
      padding: 20px 40px;
      .name-inner{
        font-size: 25px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .discription {
      height: 100%;
      width: 200px;
      padding: 10px 40px;
      ul {
        font-size: 16px;
        color: grey;
        li {
          list-style-type: none;
          padding: 5px 0px;
          i {
            padding-right: 3px;
          }
        }
      }
    }
  }
  .line-in {
    background: #f0f8ff;
  }
</style>
