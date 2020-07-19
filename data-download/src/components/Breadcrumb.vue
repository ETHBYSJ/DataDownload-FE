<template>
  <el-breadcrumb class="app-readcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.url">
      <span v-if="index === levelList.length - 1" class="no-redirect">{{item.name}}</span>
      <a v-else @click.prevent="handleLink(item)">{{item.name}}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    /*
    props: {
      list: {
        default: []
      }
    },
    */
    data() {
      return {
        levelList: []
      }
    },
    watch: {
      $route(route) {
        // console.log(route)
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        let parts = this.$route.path.split('/')
        if(parts[0] === '') {
          parts.shift()
        }
        if(parts[parts.length - 1] === '') {
          parts.pop()
        }
        let breadcrumbs = []
        for(let i = 0; i < parts.length; i++) {
          if(i === 0) {
            breadcrumbs.push({name: parts[i], url: '/' + parts[i] + '/'})
          }
          else {
            breadcrumbs.push({name: parts[i], url: breadcrumbs[i - 1].url + parts[i] + '/'})
          }
        }
        // 控制长度
        if(breadcrumbs.length > 3) {
          while(breadcrumbs.length !== 4) {
            breadcrumbs.shift()
          }
          breadcrumbs[0].name = '...'
        }
        this.levelList = breadcrumbs
      },
      handleLink(item) {
        console.log(item.url)
        this.$router.push(item.url)
      }
    }
  }
</script>
