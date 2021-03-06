<template>
  <div class="register-container">
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-position="left" label-width="0px">
      <h3 class="title">{{$t('m.Welcome_to_Register')}}</h3>
      <!--email-->
      <el-form-item prop="email">
        <el-input type="text" v-model="registerForm.email" auto-complete="off" :placeholder="$t('m.Email')" @keyup.enter.native="handleRegister"></el-input>
      </el-form-item>
      <!--firstName-->
      <el-form-item prop="firstName">
        <el-input type="text" v-model="registerForm.firstName" auto-complete="off" :placeholder="$t('m.First_Name')" @keyup.enter.native="handleRegister"></el-input>
      </el-form-item>
      <!--lastName-->
      <el-form-item prop="lastName">
        <el-input type="text" v-model="registerForm.lastName" auto-complete="off" :placeholder="$t('m.Last_Name')" @keyup.enter.native="handleRegister"></el-input>
      </el-form-item>
      <!--phoneNumber-->
      <el-form-item prop="phoneNumber">
        <el-input type="text" v-model="registerForm.phoneNumber" auto-complete="off" :placeholder="$t('m.Phone_Number')" @keyup.enter.native="handleRegister"></el-input>
      </el-form-item>
      <!--school/organization-->
      <el-form-item prop="school">
        <el-input type="text" v-model="registerForm.school" auto-complete="off" :placeholder="$t('m.School')" @keyup.enter.native="handleRegister"></el-input>
      </el-form-item>
      <!--role/title-->
      <el-form-item prop="role">
        <el-input type="text" v-model="registerForm.role" auto-complete="off" :placeholder="$t('m.Role')" @keyup.enter.native="handleRegister"></el-input>
      </el-form-item>
      <!--password-->
      <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password" auto-complete="off" :placeholder="$t('m.Password')" @keyup.enter.native="handleRegister"></el-input>
      </el-form-item>
      <!--password again-->
      <el-form-item prop="passwordAgain">
        <el-input type="password" v-model="registerForm.passwordAgain" auto-complete="off" :placeholder="$t('m.Password_Again')" @keyup.enter.native="handleRegister"></el-input>
      </el-form-item>

      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister" :loading="registering">{{$t('m.GO_Register')}}</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleToLogin">{{$t('m.Jump_to_Login')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '../../api'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'register',
    data() {
      let checkPassword = (rule, value, callback) => {
        if(value.length < 6 || value.length > 16) {
          callback(new Error(this.$t('m.Password_Length_Error')))
        }
        else {
          if(this.registerForm.checkPassword !== '') {
            this.$refs.registerForm.validateField('checkPassword')
          }
          callback()
        }
      }
      let checkPasswordAgain = (rule, value, callback) => {
        if(value.length < 6 || value.length > 16) {
          callback(new Error(this.$t('m.Password_Length_Error')))
        }
        else {
          if(value !== this.registerForm.password) {
            callback(new Error(this.$t('m.Password_Inconsistent')))
          }
          else {
            callback()
          }
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
        // return (/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/.test(trim(value))) || (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(trim(value)));;
        return (/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))
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
        registering: false,
        registerForm: {
          email: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          school: '',
          role: '',
          password: '',
          passwordAgain: ''
        },
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
          passwordAgain: [
            {required: true, trigger: 'blur', validator: checkPasswordAgain}
          ]
        },
      }
    },
    methods: {
      ...mapActions(['getUser']),
      handleRoute(route) {
        //TODO 根据用户身份选择跳转到不同页面
        this.$router.push(route)
      },
      handleRegister() {
        this.$refs.registerForm.validate((valid) => {
          if(valid) {
            this.registering = true
            api.user.register(this.registerForm).then(res => {
              if(res.data.code === 0) {
                this.registering = false
                this.getUser()
                this.handleRoute('/')
                this.$success(this.$t('m.Register_Success'))
              }
              else {
                this.registering = false
                this.$error(this.$t('m.Register_Failed'))
              }
            }).catch(() => {
              this.$error(this.$t('m.Register_Failed'))
              this.registering = false
            })
          }
          else {
            this.$error(this.$t('m.Check_Error_Fields'))
          }
        })
      },
      handleToLogin() {
        // console.log('handle to login')
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    position: relative;
    top: 0px;
    margin: auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 20px auto;
      text-align: center;
      color: #505458;
    }
  }
</style>
