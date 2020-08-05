<template>
  <div class="wrapper">
    <!--breadcrumb-->
    <div class="breadcrumb">
      <Breadcrumb></Breadcrumb>
    </div>
    <!-- 排序按钮 -->
    <el-switch width="0" v-model="asc" @change="changeSwitch" active-icon-class="el-icon-sort-up" inactive-icon-class="el-icon-sort-down"/>
    <el-dropdown trigger="click" class="sort-mode" @command="handleSort">
        <span class="el-dropdown-link">
        {{$t('m.Sort_Order')}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="dic">{{$t('m.By_Dic_Order')}}</el-dropdown-item>
        <el-dropdown-item command="natural">{{$t('m.By_Natural_Order')}}</el-dropdown-item>
        <el-dropdown-item command="size">{{$t('m.By_Size')}}</el-dropdown-item>
        <el-dropdown-item command="modified">{{$t('m.By_Modified')}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>

    <div class="file-list">
      <el-card class="files-card">
        <FileBlock :listInfo="this.FileListInfo"  ></FileBlock>
      </el-card>
    </div>


  </div>
</template>

<script>
  import api from '../api'
  import Breadcrumb from '../components/Breadcrumb';
  import FileBlock from '../components/files/FileBlock';
  import Bus from '../utils/bus'
  export default {
    name: 'Files',
    components: {
      FileBlock,
      Breadcrumb
    },
    created() {
      this.fetchData()
    },
    mounted() {

    },
    destroyed() {

    },
    watch: {
      $route() {
        this.fetchData()
      },
    },
    data() {
      return {
        // 排序方式
        by: "dic",
        // 升序/降序
        asc: true,
        FileListInfo: {items: [], numDirs: 0, numFiles: 0}, // 默认值
        addFolderLoading: false,
        refreshLoading: false,
        searchLoading: false,

      }
    },
    methods: {
      //更改排序调用的函数
      changeSwitch(data) {
        this.asc = data
        this.fetchData()
      },
      handleSort(command) {
        switch(command) {
          case 'dic': {
            this.by = 'dic'
            break
          }
          case 'natural': {
            this.by = 'natural'
            break
          }
          case 'size': {
            this.by = 'size'
            break
          }
          case 'modified': {
            this.by = 'modified'
            break
          }
          default: {
            this.by = 'dic'
          }
        }
        this.fetchData()
      },
      handleRefresh() {
        this.refreshLoading = true
        let url = this.$route.path
        // 向后端请求前，需要对路径做一些处理
        if(url.startsWith('/files')) {
            url = url.substring(6)
        }
        if(url !== '/' && url[url.length - 1] === '/') {
            url = url.substring(0, url.length - 1)
        }
        let params = {
          by: this.by,
          asc: this.asc,
          path: url
        }
        api.files.listDir(params).then(res => {
          this.refreshLoading = false
          if(res.data.code !== 0) {
              this.$error(this.$t('m.List_File_Error'))
          }
          else {
              this.FileListInfo = res.data.data
          }
        }).catch(() => {
          this.refreshLoading = false
          this.$error(this.$t('m.List_File_Error'))
        })
      },
      fetchData() {
        let url = this.$route.path
        // 向后端请求前，需要对路径做一些处理
        if(url.startsWith('/files')) {
          url = url.substring(6)
        }
        if(url !== '/' && url[url.length - 1] === '/') {
          url = url.substring(0, url.length - 1)
        }
        let params = {
          by: this.by,
          asc: this.asc,
          path: url
        }
        api.files.listDir(params).then(res => {
          console.log(res)
          if(res.data.code !== 0) {
            this.$error(this.$t('m.List_File_Error'))
          }
          else {
            this.FileListInfo = res.data.data
          }
        }).catch((err) => {
          console.log(err)
          this.$error(this.$t('m.List_File_Error'))
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    /*
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    */
    // height: 100vh;
    min-width: 500px;
    background: #f3f3f4;
    .breadcrumb {
      padding-top: 20px;
      padding-left: 20px;
    }
    /deep/ .el-switch{
      i {
      width: 8px;
      }
      .el-switch__label{
      margin: 0px;
      }
      .el-switch__core{
      margin: 0px;
      position: absolute;
      height: 0px;
      opacity: 0;
      }
    }
    .sort-mode {
      vertical-align: middle;
      line-height: 1;
      padding: 12px 15px;
      font-size: 14px;
      // float: right;
      margin-right: 10px;
      .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
      }
      .el-icon-arrow-down {
      font-size: 12px;
      }
    }
  }

</style>
