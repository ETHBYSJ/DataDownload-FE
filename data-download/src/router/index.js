import Vue from 'vue'
import Router from 'vue-router'
import routes from "./routes";

Vue.use(Router)

const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const router = new Router({
  mode: 'history',
  routes
})


export default router




