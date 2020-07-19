// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './i18n'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import router from './router'
import uploader from 'vue-simple-uploader'
import store from './store'
import filters from "./utils/filters"
import './styles/index.less'


import './style.less'

// register filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.use(Element, {locale})
Vue.use(uploader)


Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$error = (msg) => {
  Vue.prototype.$message({'message':msg, 'type': 'error'})
}

Vue.prototype.$warning = (msg) => {
  Vue.prototype.$message({'message': msg, 'type':'warning'})
}

Vue.prototype.$success = (msg) => {
  if(!msg) {
    Vue.prototype.$message({'message': 'Succeeded', 'type': 'success'})
  }
  else {
    Vue.prototype.$message({'message': msg, 'type': 'success'})
  }
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
