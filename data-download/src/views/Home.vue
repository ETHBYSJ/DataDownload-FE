<template>
  <div class="container">
    <NavBar></NavBar>
    <div>
      <SideMenu class="sidemenu-wrapper"></SideMenu>
    </div>
    <div class="content-app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import SideMenu from "../components/SideMenu";
  import NavBar from "../components/NavBar";
  export default {
    name: 'Home',
    components: {
      SideMenu,
      NavBar
    },
    mounted() {
      console.log("home mounted")
    }
  }
</script>
<style lang="less" scoped>
  .content-app {
    // padding-top: 20px;
    padding-top: 70px;
    padding-right: 10px;
    padding-left: 205px;
  }
  .sidemenu-wrapper {
    margin-top: 70px;
  }
</style>
