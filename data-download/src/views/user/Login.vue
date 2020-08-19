<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px">
      <h3 class="title">{{$t('m.Welcome_to_Login')}}</h3>
      <el-form-item prop="email">
        <el-input type="text" v-model="loginForm.email" auto-complete="on" :placeholder="$t('m.Email')" @keyup.enter.native="handleLogin"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="on" :placeholder="$t('m.Password')" @keyup.enter.native="handleLogin"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">{{$t('m.GO_Login')}}</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleToRegister">{{$t('m.Jump_to_Register')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '../../api'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'login',
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
      return {
        logining: false,
        loginForm: {
          email: '',
          password: ''
        },

        rules: {
          email: [
            {required: true, trigger: 'blur', validator: checkEmail}
          ],
          password: [
            {required: true, trigger: 'blur', validator: checkPassword}
          ]
        },

      }
    },
    methods: {
      ...mapActions(['getUser']),
      handleRoute(route) {
        // TODO 根据用户身份选择跳转到不同的页面
        this.$router.push(route)
      },
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if(valid) {
            this.logining = true
            api.user.login(this.loginForm).then(res => {
              // console.log('success',res)
              if(res.data.code === 0) {
                // console.log(res)
                this.logining = false
                this.getUser()
                this.handleRoute('/')
                this.$success(this.$t('m.Welcome_Back'))
              }
              else {
                this.logining = false
                this.$error(this.$t('m.Login_Failed'))
              }
            }).catch((err) => {
                this.$error(this.$t('m.Login_Failed'))
                this.logining = false
                api.user.activate_request({email:this.loginForm.email}).then(res =>{
                  // console.log(res,res.data.userId)
                  this.$store.commit('activateUserId', res.data.data.userId)
                }).catch(()=>{
                  this.$error(this.$t('m.Login_Failed'))
                })
                  this.handleRoute('/activate')
                // console.log(err)
            })
          }
          else {
            this.$error(this.$t('m.Check_Error_Fields'))
          }
        })
      },
      handleToRegister() {
        // console.log('handle to register')
        this.$router.push({name: 'register'})
      }
    },
    // beforeRouteLeave(to, from, next){
    //   if(to.name ==='item' && ( this.isActive===false || this.isActive === undefined)){
    //     this.$router.push('/activate')        
    //   }
    //   else
    //   {
    //     next()
    //   }
    //}
  }
</script>

<style lang="less" scoped>
  .login-container {
    position: relative;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    top: 100px;
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
