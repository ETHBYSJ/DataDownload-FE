<template>
  <div class="wrapper">
    <!--breadcrumb-->
    <div class="breadcrumb">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="button-group">
      <el-button type="primary" :loading="addFolderLoading" icon="el-icon-folder-add" @click="handleAddFolder">{{$t('m.New_Folder')}}</el-button>
      <el-button type="primary" icon="el-icon-upload" @click="handleUploadFile">{{$t('m.Upload')}}</el-button>
      <el-button type="primary" :loading="refreshLoading" icon="el-icon-refresh" @click="handleRefresh">{{$t('m.Refresh')}}</el-button>
      <!--搜索框-->
      <div class="search-wrapper">
        <template>
          <el-radio-group v-model="asc" @change="changeRadio" class="radio-group">
            <el-radio :label="true">{{$t('m.Ascend')}}</el-radio>
            <el-radio :label="false">{{$t('m.Descend')}}</el-radio>
          </el-radio-group>
        </template>
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
        <el-input
          class="search-input"
          :placeholder="$t('m.Search_File')"
          v-model="search"
          @keyup.enter.native="doSearch">
        </el-input>
        <el-button :loading="searchLoading" class="search-btn" type="primary" icon="el-icon-search" @click="doSearch"></el-button>
      </div>

    </div>
    <div class="file-list">
      <el-card class="files-card">
        <file-list :listInfo="this.fileListInfo" v-on:delete="onDelete"></file-list>
      </el-card>
    </div>
    <!--对话框 新建文件夹-->
    <el-dialog
      :title="$t('m.Create_Folder')"
      :visible.sync="dialogVisible"
      @open="onOpenEditDialog"
      :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item :label="$t('m.New_Folder_Name')" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">{{$t('m.Cancel')}}</el-button>
        <el-button type="primary" @click="doAddFolder">{{$t('m.Confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../api'
  import Breadcrumb from '../components/Breadcrumb';
  import FileList from '../components/files/FileList';
  import Bus from '../utils/bus'
  export default {
    name: 'Files',
    components: {
      FileList,
      Breadcrumb
    },
    created() {
      this.fetchData()
    },
    mounted() {
      // 文件选择后的回调
      Bus.$on('fileAdded', () => {
      })
      // 文件上传成功的回调
      Bus.$on('fileSuccess', () => {
        this.fetchData()
      })
    },
    destroyed() {
      Bus.$off('fileAdded')
      Bus.$off('fileSuccess')
    },
    watch: {
      $route() {
        this.fetchData()
      }
    },
    data() {
      return {
        // radio: true,
        search: '',
        dialogVisible: false,
        form: {
          name: ''
        },
        // 排序方式
        by: "dic",
        // 升序/降序
        asc: true,
        fileListInfo: {items: [], numDirs: 0, numFiles: 0}, // 默认值
        addFolderLoading: false,
        refreshLoading: false,
        searchLoading: false
      }
    },
    methods: {
      changeRadio(value) {
        this.asc = value
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
      doSearch() {
        this.searchLoading = true
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
          path: url,
          keyword: this.search
        }
        api.files.listDirByKeyword(params).then(res => {
          this.searchLoading = false
          if(res.data.code === 0) {
            this.fileListInfo = res.data.data
          }
          else {
            this.$error(this.$t('m.Search_Error'))
          }

        }).catch(() => {
          this.searchLoading = false
          this.$error(this.$t('m.Search_Error'))
        })
      },
      onDelete() {
        // 子元素传来的删除事件
        this.fetchData()
      },
      doAddFolder() {
        if(this.form.name === '') {
          this.$error(this.$t('m.New_Folder_Name_Empty'))
          this.dialogVisible = false
          return
        }
        this.addFolderLoading = true
        let url = this.$route.path
        if(url.startsWith('/files')) {
          url = url.substring(6)
        }
        if(url !== '/' && url[url.length - 1] === '/') {
            url = url.substring(0, url.length - 1)
        }
        let params = {
          path: url,
          name: this.form.name
        }
        api.files.createFolder(params).then(res => {
          this.dialogVisible = false
          this.addFolderLoading = false
          if(res.data.code !== 0) {
            this.$error(this.$t('m.Create_Folder_Error'))
          }
          else {
            this.$success(this.$t('m.Create_Folder_Success'))
            this.fetchData()
          }
        }).catch(() => {
          this.dialogVisible = false
          this.addFolderLoading = false
          this.$error(this.$t('m.Create_Folder_Error'))
        })
        // this.dialogVisible = false

      },
      onOpenEditDialog() {

      },
      handleAddFolder() {
        this.dialogVisible = true
        //let params
      },
      handleUploadFile() {
        Bus.$emit('openUploader', {})
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
              this.fileListInfo = res.data.data
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
          if(res.data.code !== 0) {
            this.$error(this.$t('m.List_File_Error'))
          }
          else {
            this.fileListInfo = res.data.data
          }
        }).catch(() => {
          this.$error(this.$t('m.List_File_Error'))
        })
      }
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
    background: #f3f3f4;
    .breadcrumb {
      padding-top: 20px;
      padding-left: 20px;
    }
    .button-group {
      padding-top: 10px;
      padding-left: 20px;
      padding-bottom: 10px;
      .search-wrapper {
        float: right;
        .radio-group {
          // vertical-align: middle;
          margin-right: 20px;
          .el-radio {
            margin-right: 10px;
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
        .search-input {
          vertical-align: middle;
          width: 200px;
        }
        .search-btn {
          vertical-align: middle;
          margin-right: 20px;
        }
      }

    }
    .file-list {
      .files-card {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }

</style>
