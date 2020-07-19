<template>
  <div id="app">
    <router-view></router-view>
    <!--上传组件-->
    <global-uploader></global-uploader>
  </div>
</template>

<script>
  import GlobalUploader from "./components/files/GlobalUploader";
  export default {
    name: 'App',
    components: {
      GlobalUploader,
    }
  }
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f3f3f4;
}
</style>
