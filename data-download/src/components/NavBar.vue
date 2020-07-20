<template>
  <div id="header">

    <div class="logo">
      CRADI
    </div>
    <el-menu class="menu">
      <template v-if="!isAuthenticated">
        <div class="btn-menu">
          <el-button type="primary" @click="handleLogin">{{$t('m.Login')}}</el-button>
          <el-button type="primary" @click="handleRegister">{{$t('m.Register')}}</el-button>
        </div>
      </template>
      <template v-else>
        <el-dropdown trigger="click" class="current-user" @command="handleUserMenu">
          <span class="el-dropdown-link">
            {{this.user.email}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">{{$t('m.User_Profile')}}</el-dropdown-item>
            <el-dropdown-item command="logout">{{$t('m.Logout')}}</el-dropdown-item>
            <el-dropdown-item command="myfiles">{{$t('m.My_Files')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <!--语言选择-->
      <el-dropdown trigger="click" class="language-change" @command="handleLanguageSelect">
        <span class="el-dropdown-link">
          中文<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
          <el-dropdown-item command="en-US">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
  import api from '../api'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mounted() {
      console.log("mounted")
      this.getUser()
    },
    data() {
      return {
        language: "zh-CN"
      }
    },
    methods: {
      ...mapActions(['getUser']),
      handleLogin() {
        this.$router.push({name: 'login'})
      },
      handleRegister() {
        this.$router.push({name: 'register'})
      },
      handleLogout() {
        api.user.logout().then(res => {
          if(res.data.code === 0) {
            this.$success(this.$t('m.Logout_Success'))
            this.$store.dispatch('clearUser')
            this.$router.replace({path: '/'})
          }
          else {
            this.$error(this.$t('m.Logout_Failed'))
            this.$store.dispatch('clearUser')
            this.$router.replace({path: '/'})
          }
        }).catch(() => {
          this.$error(this.$t('m.Logout_Failed'))
          this.$store.dispatch('clearUser')
          this.$router.replace({path: '/'})
        })
      },
      handleUserMenu(command) {
        switch(command) {
          case "profile": {
            this.$router.push({name: 'profile'})
            break
          }
          case "logout": {
            this.handleLogout()
            break
          }
          case 'myfiles': {
            console.log("myfiles")
            this.$router.push({name: 'myfiles'})
            break
          }
          default: {
            break
          }
        }
      },
      handleLanguageSelect(command) {
        // console.log(command)
        switch(command) {
          case "zh-CN": {
            console.log("zh-CN")
            this.language = "zh-CN"
            this.$i18n.locale = this.language
            break
          }
          case "en-US": {
            console.log("en-US")
            this.language = "en-US"
            this.$i18n.locale = this.language
            break
          }
          default: {
            break
          }
        }
        if(this.isAuthenticated) {
          let params = {
            language: this.language
          }
          api.user.setLanguage(params).then(res => {
            console.log(res)
            if(res.data.code === 0) {
              this.$success(this.$t('m.Language_Preference'))
            }
            else {
              this.$error(this.$t('m.Language_Set_Error'))
            }
          }).catch(() => {
              this.$error(this.$t('m.Language_Set_Error'))
          })
        }
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'isAdmin', 'user'])
    }

  }
</script>

<style lang="less" scoped>
  #header {
    min-width: 1100px;
    position: fixed;
    top: 0;
    padding-top: 10px;
    left: 0;
    height: 60px;
    width: 100%;
    z-index: 1000;
    background-color: #292928;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    .menu {
      top: 5px;
      background-color: #292928;
    }
    .logo {
      // background-color: #292928;
      margin-left: 2%;
      margin-right: 2%;
      font-size: 50px;
      // float: left;
      position: absolute;
      line-height: 60px;
      text-align: center;
      color: #ffffff;
      z-index: 1000;
      top: 5px;
    }
    .btn-menu {
      font-size: 16px;
      float: right;
      margin-right: 10px;
    }
    .current-user {
      line-height: 1;
      padding: 12px 15px;
      font-size: 16px;
      float: right;
      margin-right: 10px;
      .el-dropdown-link {
        cursor: pointer;
        // color: #409EFF;
        color: #ffffff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
    .language-change {
      line-height: 1;
      padding: 12px 15px;
      font-size: 15px;
      float: right;
      margin-right: 10px;
      .el-dropdown-link {
        cursor: pointer;
        // color: #409EFF;
        color: #ffffff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
</style>
