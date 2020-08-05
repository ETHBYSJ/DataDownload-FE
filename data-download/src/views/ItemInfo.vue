<template>
  <div>
    <el-container class="header">
      <el-header class="name">
        <h2>CRADI</h2>
      </el-header>
      <el-container class="main">
        <el-aside width="50%" class="image">
          <el-image :src="imgUrl" fit="contain"  @down.prevent alt="This is an image"/>
        </el-aside>
        <el-main class="side-info">
          <div class="title">{{$t('m.About')}}</div>
          <ul>
<<<<<<< HEAD
            <li><i class="el-icon-circle-check"></i>{{$t('m.Info1')}}</li>
            <li><i class="el-icon-circle-check"></i>{{$t('m.Info2')}}</li>
            <li><i class="el-icon-circle-check"></i>{{$t('m.Info3')}}</li>
=======
            <li><i class="el-icon-circle-check"></i>{{$t('m.About1')}}</li>
            <li><i class="el-icon-circle-check"></i>{{$t('m.About2')}}</li>
            <li><i class="el-icon-circle-check"></i>{{$t('m.About3')}}</li>
>>>>>>> origin/static
          </ul>
          <div class="downloadBtn">
            <el-button type="primary" @click="handleDownload" >{{$t('m.Download')}}</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <div class="body">
      <el-tabs v-model="tabActiveName" >
        <el-tab-pane :label="$t('m.Description')" name="first"><Introduction></Introduction></el-tab-pane>
        <el-tab-pane :label="$t('m.License')" name="second"><Agreement></Agreement></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Introduction from './Introduction'
import Agreement from './Agreement'
import {mapGetters} from 'vuex'

import api from '../api'

  export default {
    name: "ItemInfo",
    components : {
      Introduction,
      Agreement
    },
    data: function () {
      return{
        tabActiveName:"first",
        //图片相对地址
<<<<<<< HEAD
        imgUrl:require("../assets/img2.png"),
=======
        imgUrl: require("../assets/image2.png"),
>>>>>>> origin/static
        //数据包名称
        name: 'example.zip'
      }
    },
    computed:{
      ...mapGetters(['isAuthenticated'])
    },
    mounted() {
        this.$on('error',(e)=> {console.log(e)})
    },
    methods:
    {
      handleDownload() {
        this.doDownload()
      },
      doDownload() {
        let params = {
          name: this.name,
          path: '/'
        }
        console.log(params)
        api.files.downloadSession(params).then(res => {
          console.log(res)
          if(res.data.code !== 0) {
            this.$error(this.$t('m.Download_Error'))
          }
          else {
            window.location.href = res.data.data
          }
        }).catch(() => {
          this.$error(this.$t('m.Download_Error'))
        })
        // window.location.href = 'http://127.0.0.1:8088/api/v1/file/download_test'
        /*
        api.files.downloadStatic(data).then(res => {
          // console.log(res)
          let link = document.createElement('a')
          let blob = new Blob([res.data], {type: 'octet/stream'})
          // let objectUrl = URL.createObjectURL(blob)
          // window.location.href = objectUrl
          link.download = this.name
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          // saveAs(blob, this.oldName)

        }).catch(() => {
          this.$error(this.$t('m.Download_Error'))
        })
        */
      },
    }

  }

</script>

<style lang='less' scoped>
    .header {
      .name {
        padding: 15px 20px 0 20px;
        border-bottom: 1px solid #e1e1e1;
        font-size: 20px;
      }
      .main {
        .image{
          /deep/ .el-image{
            width: 100%;
          }
        }
        .side-info {
          margin-left: 20px;
          // display: inline-block;
          .title{
            font-size: 18px;
            font-weight: bold;
            border-bottom: 1px solid #e1e1e1;
            height: 20%;
          }
          ul {
            font-size: 16px;
            color: grey;
            height: 40%;
            li {
              list-style-type: none;
              padding: 5px 0px;
              i {
                padding-right: 3px;
              }
            }
          }
          .downloadBtn{
            height: 20%;
            margin-top: 10px;
          }

        }
      }
  }
</style>
