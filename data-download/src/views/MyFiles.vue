<!--我的文件-->
<template>
  <div class="files-wrapper">
    <el-card class="files-card">
      <div slot="header" class="files-header">
        <span>{{$t('m.My_Files')}}</span>
        <div class="search-wrapper">
          <!--通过审核状态进行过滤-->
          <el-dropdown trigger="click" class="filter-mode" @command="handleFilter">
          <span class="el-dropdown-link">
            {{$t('m.File_Review_Status')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="reviewed">{{$t('m.Reviewed_Only')}}</el-dropdown-item>
              <el-dropdown-item command="unreviewed">{{$t('m.UnReviewed_Only')}}</el-dropdown-item>
              <el-dropdown-item command="all">{{$t('m.Review_All')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--搜索-->
          <el-input
            class="search-input"
            :placeholder="$t('m.Search_File')"
            v-model="keyword"
            @keyup.enter.native="doSearch">
          </el-input>
          <el-button class="search-btn" type="primary" icon="el-icon-search" @click="doSearch"></el-button>
        </div>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="loading"
        ref="table"
        :data="fileList"
        :fit="true">
        <!--name-->
        <el-table-column
          prop="Name"
          :label="$t('m.File_Name')">
        </el-table-column>
        <!--path-->
        <el-table-column
          prop="Path"
          :label="$t('m.File_Path')">
        </el-table-column>
        <!--size-->
        <el-table-column
          :label="$t('m.File_Size')">
          <template slot-scope="scope">
            {{scope.row.Size | fileSize}}
          </template>
        </el-table-column>
        <!--status-->
        <el-table-column
          :label="$t('m.File_Review_Status')">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.Review === 1">
              {{$t('m.Reviewed')}}
            </el-tag>
            <el-tag type="danger" v-else>
              {{$t('m.UnReviewed')}}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div class="options">
        <el-pagination
          class="page"
          layout="prev, pager, next"
          @current-change="currentChange"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import api from '../api'
  import {mapGetters} from 'vuex'
  export default {
    name: 'MyFiles',
    data() {
      return {
        // searchLoading: false,
        loading: false,
        fileList: [],
        total: 0,
        pageSize: 2,
        keyword: '',
        // 0: 未审核 1: 已审核 2: 全部
        category: 2,
        currentPage: 1
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    mounted() {
      this.getMyFiles(1)
    },
    methods: {
      doSearch() {
        this.getMyFiles(1)
      },
      handleFilter(command) {
        switch(command) {
          case 'reviewed':{
            this.category = 1
            break
          }
          case 'unreviewed': {
            this.category = 0
            break
          }
          case 'all': {
            this.category = 2
            break
          }
          default: {
            this.category = 2
          }
        }
        this.getMyFiles(1)
      },
      getMyFiles(page) {
        this.loading = true
        let params = {
          page: page,
          pageSize: this.pageSize,
          keyword: this.keyword,
          uid: this.user.id,
          category: this.category
        }
        api.user.getMyFiles(params).then(res => {
          this.loading = false
          if(res.data.code === 0) {
            this.total = res.data.data.count
            this.fileList = res.data.data.files
          }
          else {
            this.$error(this.$t('m.Get_My_Files_Error'))
          }

        }).catch(() => {
          this.loading = false
          this.$error(this.$t('m.Get_My_Files_Error'))
        })
      },
      currentChange(page) {
        this.currentPage = page
        this.getMyFiles(page)
      }
    }
  }
</script>

<style lang="less" scoped>
  .files-wrapper {
    .files-card {
      margin-left: 20px;
      margin-top: 20px;
      .files-header {
        font-size: 20px;
        .search-wrapper {
          float: right;
          .filter-mode {
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
      .options {
        float: right;
        margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
</style>
