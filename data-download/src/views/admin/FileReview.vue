<!--文件审核-->
<template>
  <div class="files-wrapper">
    <el-card class="files-card">
      <div slot="header" class="files-header">
        <span>{{$t('m.File_List')}}</span>
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
        <!--uid-->
        <el-table-column
          width="100"
          prop="OwnerID"
          :label="$t('m.OwnerID')">
        </el-table-column>
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
          :label="$t('m.File_If_Review')">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Review"
              active-text=""
              inactive-text=""
              @change="updateReviewStatus(scope.row)">
            </el-switch>
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
  import api from '../../api'
  export default {
    name: 'FileReview',
    data() {
      return {
        loading: false,
        fileList: [],
        pageSize: 2,
        total: 0,
        keyword: '',
        category: 2,
        currentPage: 1,
      }
    },
    mounted() {
      this.getFiles(1)
    },
    methods: {
      updateReviewStatus(row) {
        let params = {
          id: row.ID,
          review: row.Review
        }
        api.admin.updateReviewStatus(params).then(res => {
          if(res.data.code === 0) {
            this.$success(this.$t('m.Update_Review_Success'))
            this.getFiles(1)
          }
          else {
            this.$error(this.$t('m.Update_Review_Error'))
          }
        }).catch(() => {
          this.$error(this.$t('m.Update_Review_Error'))
        })
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
        this.getFiles(1)
      },
      doSearch() {
        this.getFiles(1)
      },
      currentChange(page) {
        this.currentPage = page
        this.getFiles(page)
      },
      getFiles(page) {
        this.loading = true
        let params = {
          page: page,
          pageSize: this.pageSize,
          keyword: this.keyword,
          category: this.category
        }
        api.admin.getFiles(params).then(res => {
          this.loading = false
          if(res.data.code === 0) {
            this.total = res.data.data.count
            this.fileList = res.data.data.files
          }
          else {
            this.$error(this.$t('m.Get_Files_Error'))
          }
        }).catch(() => {
          this.loading = false
          this.$error(this.$t('m.Get_Files_Error'))
        })
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
        margin-right: 20px;
        margin-top: 20px;
      }
    }
  }
</style>
