<template>
  <div class="profile-wrapper">
    <el-card class="profile-card">
      <div slot="header" class="card-header">
        {{$t('m.User_Profile')}}
      </div>
      <!--用户信息-->
      <div class="user-profile">
        <!--email-->
        <div class="item">
          <span class="profile-header">
            {{$t('m.Email')}}
          </span>
          <span class="profile-content">
            {{user.email || '&nbsp;'}}
          </span>
        </div>
        <!--first name-->
        <div class="item">
          <span class="profile-header">
            {{$t('m.First_Name')}}
          </span>
          <span class="profile-content">
            {{user.firstName || '&nbsp;'}}
          </span>
        </div>
        <!--last name-->
        <div class="item">
          <span class="profile-header">
            {{$t('m.Last_Name')}}
          </span>
          <span class="profile-content">
            {{user.lastName || '&nbsp;'}}
          </span>
        </div>
        <!--phone number-->
        <div class="item">
          <span class="profile-header">
            {{$t('m.Phone_Number')}}
          </span>
          <span class="profile-content">
            {{user.phoneNumber || '&nbsp;'}}
          </span>
        </div>
        <!--school/organization-->
        <div class="item">
          <span class="profile-header">
            {{$t('m.School')}}
          </span>
          <span class="profile-content">
            {{user.school || '&nbsp;'}}
          </span>
        </div>
        <!--role/title-->
        <div class="item">
          <span class="profile-header">
            {{$t('m.Role')}}
          </span>
          <span class="profile-content">
            {{user.role || '&nbsp;'}}
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import api from '../api'
  export default {
    name: 'Profile',
    data() {
      return {
        user: {
          email: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          school: '',
          role: ''
        }
      }
    },
    computed: {

    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // this.getUser()
        api.user.getProfile().then(res => {
          console.log(res)
          if(res.data.code === 0) {
            this.user = res.data.data
          }
          else {
            this.$error(this.$t('m.Check_Login'))
          }
        }).catch(() => {
          this.$error(this.$t('m.Check_Login'))
        })
      }
    }

  }
</script>

<style lang="less" scoped>
  .profile-wrapper {
    .profile-card {
      width: 400px;
      margin-left: 20px;
      // margin-right: 20px;
      margin-top: 20px;
      .card-header {
        font-size: 20px;
      }
      .user-profile {
        .item {
          margin-bottom: 20px;
          .profile-header {
            float: left;
            width: 100px;
            font-size: 16px;
          }
          .profile-content {
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
