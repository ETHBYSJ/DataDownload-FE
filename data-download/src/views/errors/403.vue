<template>
  <div class="error403">
    <div class="error403-body-con">
      <div class="error403-body-con-title">403</div>
      <p class="error403-body-con-message">NO&nbsp;&nbsp;PERMISSION</p>
      <div class="error403-btn-con">
        <el-button @click="goHome" size="large" style="width: 200px;" type="ghost">{{$t('m.Go_Home')}}</el-button>
        <el-button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">{{$t('m.Back')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoPermission',
    methods: {
      backPage () {
        this.$router.go(-1)
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
    &-body-con {
      width: 700px;
      height: 500px;
      margin: 0 auto;
      &-title {
        text-align: center;
        font-size: 240px;
        font-weight: 700;
        color: #2d8cf0;
        height: 260px;
        line-height: 260px;
        margin-top: 40px;
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
        font-size: 30px;
        font-weight: 500;
        letter-spacing: 12px;
        color: #dddde2;
      }
    }
    &-btn-con {
      text-align: center;
      padding: 20px 0;
      margin-bottom: 40px;
    }
  }
</style>


