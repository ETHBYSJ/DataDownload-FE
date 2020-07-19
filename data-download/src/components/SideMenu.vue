<template>
  <!--
  <el-menu class="vertical-menu"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           :router="true" :default-active="currentPath">
    -->
  <el-menu class="vertical-menu"
           background-color="#fff"
           text-color="#8b9199"
           active-text-color="#ff4088"
           @open="handleOpen"
           :router="true" :default-active="currentPath">
    <el-menu-item index="/introduction"><i class="el-icon-info"></i>{{$t('m.Introduction')}}</el-menu-item>
    <el-menu-item index="/files/"><i class="el-icon-document"></i>{{$t('m.Files')}}</el-menu-item>
    <el-submenu index="about">
      <template slot="title"><i class="el-icon-menu"></i>{{$t('m.About')}}</template>
      <el-menu-item index="/about/agreement">{{$t('m.Agreement')}}</el-menu-item>
      <el-menu-item index="/about/downloading">{{$t('m.Downloading')}}</el-menu-item>
    </el-submenu>
    <!--
    <el-menu-item index="/help"><i class="el-icon-document"></i>{{$t('m.Help')}}</el-menu-item>
    -->
  </el-menu>
</template>

<script>
  export default {
    name: 'SideMenu',
    data() {
      return {
        currentPath: ''
      }
    },
    methods:{
      handleOpen() {
        console.log('handle open')
      }
    },
    created() {
      this.currentPath = this.$route.path
    },
    watch: {
      $route() {
        this.currentPath = this.$route.path
      }
    }
  }
</script>

<style scoped lang="less">
  .vertical-menu {
    overflow: auto;
    width: 205px;
    // height: 100%;
    position: fixed !important;
    top: 0;
    bottom: 0;
    left: 0;
  }
  .el-menu-item {
    border-bottom: 1px solid #d7d7d7;
  }
  .el-submenu {
    border-bottom: 1px solid #d7d7d7;
  }
</style>







