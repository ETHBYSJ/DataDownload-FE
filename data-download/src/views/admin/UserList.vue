<template>
  <div class="user-wrapper">
    <el-card class="user-card">
      <div slot="header" class="list-header">
        {{$t('m.Users')}}
      </div>
      <!--显示所有用户的部分信息-->
      <el-table
        v-loading="loading"
        element-loading-text="loading"
        ref="table"
        :data="userList"
        :fit="true">
        <!--ID-->
        <el-table-column
          prop="ID"
          label="ID"
          width="60">
        </el-table-column>
        <!--email-->
        <el-table-column
          prop="Email"
          :label="$t('m.Email')"
          width="200">
        </el-table-column>
        <!--first name-->
        <el-table-column
          prop="FirstName"
          :label="$t('m.First_Name')">
        </el-table-column>
        <!--last name-->
        <el-table-column
          prop="LastName"
          :label="$t('m.Last_Name')">
        </el-table-column>
        <!--phone number-->
        <el-table-column
          prop="PhoneNumber"
          :label="$t('m.Phone_Number')">
        </el-table-column>
        <!--school-->
        <el-table-column
          prop="School"
          :label="$t('m.School')">
        </el-table-column>
        <!--role-->
        <el-table-column
          prop="Role"
          :label="$t('m.Role')">
        </el-table-column>
        <!--user type-->
        <el-table-column
          prop="UserType"
          :label="$t('m.User_Type')">
        </el-table-column>
        <!--status-->
        <el-table-column
          prop="Status"
          :label="$t('m.Status')">
          <template slot-scope="scope">
            <el-switch
              v-if="scope.row.UserType !== 'Admin'"
              v-model="scope.row.Status"
              active-text=""
              inactive-text=""
              @change="updateUserStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <div class="options">
        <el-button class="create-user-btn" type="primary" size="small" @click="dialogVisible=true" icon="el-icon-plus">{{$t('m.Create_User')}}</el-button>
        <el-pagination
          class="page"
          layout="prev, pager, next"
          @current-change="currentChange"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

    <!--创建新用户-->
    <el-dialog
      :title="$t('m.Create_User')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form">
        <!--email-->
        <el-form-item prop="email" :label="$t('m.Email')" label-width="120px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <!--first name-->
        <el-form-item prop="firstName" :label="$t('m.First_Name')" label-width="120px">
          <el-input v-model="form.firstName" autocomplete="off"></el-input>
        </el-form-item>
        <!--last name-->
        <el-form-item prop="lastName" :label="$t('m.Last_Name')" label-width="120px">
          <el-input v-model="form.lastName" autocomplete="off"></el-input>
        </el-form-item>
        <!--phone number-->
        <el-form-item prop="phoneNumber" :label="$t('m.Phone_Number')" label-width="120px">
          <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <!--school-->
        <el-form-item prop="school" :label="$t('m.School')" label-width="120px">
          <el-input v-model="form.school" autocomplete="off"></el-input>
        </el-form-item>
        <!--role-->
        <el-form-item prop="role" :label="$t('m.Role')" label-width="120px">
          <el-input v-model="form.role" autocomplete="off"></el-input>
        </el-form-item>
        <!--password-->
        <el-form-item prop="password" :label="$t('m.Password')" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <!--user type-->
        <el-form-item :label="$t('m.User_Type')" label-width="120px">
          <el-radio-group v-model="form.userType">
            <el-radio label="Admin">{{$t('m.Admin_User')}}</el-radio>
            <el-radio label="User">{{$t('m.Normal_User')}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button class="submit-btn" type="primary" size="small" @click="handleSubmit" :loading="submitting">{{$t('m.Submit')}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
  // TODO 进入时检查admin权限
  import api from '../../api'
  export default {
    name: 'UserList',
    data() {
      let checkPassword = (rule, value, callback) => {
        if(value.length < 6 || value.length > 16) {
          callback(new Error(this.$t('m.Password_Length_Error')))
        }
        else {
          callback()
        }
      }
      let checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if(mailReg.test(value)) {
          callback()
        }
        else {
          callback(new Error(this.$t('m.Email_Format_Error')))
        }
      }
      let checkFirstName = (rule, value, callback) => {
        if(value !== '') {
          callback()
        }
        else {
          callback(new Error(this.$t('m.First_Name_Empty')))
        }
      }
      let checkLastName = (rule, value, callback) => {
        if(value !== '') {
          callback()
        }
        else {
          callback(new Error(this.$t('m.Last_Name_Empty')))
        }
      }
      let trim = (value) => {
        let m = value.match(/^\s*(\S+(\s+\S+)*)\s*$/);
        return (m == null) ? "" : m[1];
      }
      let checkMobileOrTel = (value) => {
        return (/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/.test(trim(value))) || (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(trim(value)));;
      }
      let checkPhoneNumber = (rule, value, callback) => {
        if(checkMobileOrTel(value)) {
          callback()
        }
        else {
          callback(new Error(this.$t('m.Phone_Format_Error')))
        }
      }
      let checkSchool = (rule, value, callback) => {
        if(value !== '') {
          callback()
        }
        else {
          callback(new Error(this.$t('m.School_Empty')))
        }
      }
      let checkRole = (rule, value, callback) => {
        if(value !== '') {
          callback()
        }
        else {
          callback(new Error(this.$t('m.Role_Empty')))
        }
      }
      return {
        dialogVisible: false,
        loading: false,
        userList: [],
        submitting: false,
        form: {
          email: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          school: '',
          role: '',
          password: '',
          userType: 'User'
        },
        currentPage: 1,
        pageSize: 10,
        total: 0,

        rules: {
          email: [
            {required: true, trigger: 'blur', validator: checkEmail}
          ],
          firstName: [
            {required: true, trigger: 'blur', validator: checkFirstName}
          ],
          lastName: [
            {required: true, trigger: 'blur', validator: checkLastName}
          ],
          phoneNumber: [
            {required: true, trigger: 'blur', validator: checkPhoneNumber}
          ],
          school: [
            {required: true, trigger: 'blur', validator: checkSchool}
          ],
          role: [
            {required: true, trigger: 'blur', validator: checkRole}
          ],
          password: [
            {required: true, trigger: 'blur', validator: checkPassword}
          ],
        }
      }
    },
    mounted() {
      this.getUserList(1)
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate((valid) => {
          if(valid) {
            this.submitting = true
            api.admin.createUser(this.form).then(res => {
              this.dialogVisible = false
              if(res.data.code === 0) {
                this.$success(this.$t('m.Create_User_Success'))
                this.getUserList(1)
              }
              else {
                this.$error(this.$t('m.Create_User_Error'))
              }
            }).catch(() => {
              this.dialogVisible = false
              this.$error(this.$t('m.Create_User_Error'))
            })
          }
          else {
            this.$error(this.$t('m.Check_Error_Fields'))
          }
        })
      },
      updateUserStatus(row) {
        let params = {
          id: row.ID,
          status: row.Status
        }
        api.admin.updateUserStatus(params).then(res => {
          if(res.data.code === 0) {
            this.$success(this.$t('m.Update_User_Status_Success'))
          }
          else {
            this.$error(this.$t('m.Update_User_Status_Error'))
          }
        }).catch(() => {
          this.$error(this.$t('m.Update_User_Status_Error'))
        })
      },
      getUserList(page) {
        this.loading = true
        let params = {
          page: page,
          pageSize: this.pageSize
        }
        api.admin.listUser(params).then(res => {
          this.loading = false
          if(res.data.code === 0) {
            this.userList = res.data.data.users
            this.total = res.data.data.count
          }
          else {
            this.$error(this.$t('m.Get_User_List_Error'))
          }
        }).catch(() => {
          this.loading = false
          this.$error(this.$t('m.Get_User_List_Error'))
        })
      },
      currentChange(page) {
        this.currentPage = page
        this.getUserList(page)
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-wrapper {
    .user-card {
      margin-left: 20px;
      margin-top: 20px;
      .list-header {
        font-size: 20px;
      }
      .options {
        .create-user-btn {
          margin-top: 20px;
        }
        .page {
          margin-top: 20px;
          margin-right: 20px;
          float: right;
        }
      }
    }

  }
</style>
