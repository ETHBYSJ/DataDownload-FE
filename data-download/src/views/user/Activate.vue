<template>
  <div class="error403">
    <div class="error403-body-con">
      <div class="error403-body-con-title">{{this.$t('m.NotActivated')}}</div>
      <p class="error403-body-con-message">{{this.$t('m.NotActivatedMessage')}}</p>
      <div class="code">
        <el-input type="text" v-model="code" class="code-text">
          <template slot="append"><el-button type="plain" @click.prevent.native.stop="handleSubmit">{{this.$t('m.Submit')}}</el-button></template>
        </el-input>
      </div>
      <div class="error403-btn-con">
        <el-button @click="goHome" size="large" style="width: 200px;" type="ghost">{{$t('m.Go_Home')}}</el-button>
        <!-- <el-button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">{{$t('m.Back')}}</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '../../api' 

  export default {
    name: 'Activate',
    data(){
      return{
        code:"",
        // userId:0,
      } 
    },
    computed:{
      ...mapState(['user'])
      },
    methods: {
      handleSubmit() {
        if (this.code.search(/[a-zA-Z0-9]{6}/) === -1) {
          this.$error(this.$t('m.CodeError'))
        }
        else{
          let data = {
            userid:this.user.userId,
            code: (this.code)
          }
          console.log(data)
          api.user.activate(data).then(res=>{
            // console.log(res, res.data)
            if(res.data.code === 0){
              this.$router.push('/login')
              this.$success(this.$t('m.ActivateSucceed'))
              //just for test, remember to comment out
              // this.$store.commit('changeUserActive')
              // console.log(this.user)
            }
          }).catch((err) => {
            // console.log("error", err)
            this.$error(this.$t('m.ActivateFail'))
          })
          // console.log(data,typeof(data.userid),typeof(data.code))
        }
      },
      goHome () {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @keyframes error403animation {
    0% {
      transform: rotateZ(0deg);
    }
    20% {
      transform: rotateZ(-60deg);
    }
    40% {
      transform: rotateZ(-10deg);
    }
    60% {
      transform: rotateZ(50deg);
    }
    80% {
      transform: rotateZ(-20deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }

  .error403 {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 20%;
    right: 20%;
    &-body-con {
      width: 700px;
      height: 100%;
      margin: 0 auto;
      background-color: white;
      &-title {
        text-align: center;
        font-size: 100px;
        font-weight: 700;
        color: #2d8cf0;
        height: 200px;
        line-height: 260px;
        // margin-top: 40px;
        span {
          display: inline-block;
          color: #19be6b;
          font-size: 230px;
          animation: error403animation 3s ease 0s infinite alternate;
        }
      }
      &-message {
        display: block;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 5px;
        color: #87878d;
        margin: 20px 0;
      }
      .code{
        margin-top: 40px;
        text-align: center;
        .code-text {
          width: 180px;
        }
      }
    }
    &-btn-con {
      text-align: center;
      padding: 20px 0;
      margin-bottom: 40px;
    }
  }
</style>








