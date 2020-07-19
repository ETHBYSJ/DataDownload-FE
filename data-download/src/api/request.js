import axios from 'axios'
import router from '../router'
import store from '../store'
import {ERROR_CODE} from "../utils/constants";

const service = axios.create({
  timeout: 15000
})

service.interceptors.response.use(
  response => {
    console.log(response)
    if(response.data.code !== 0 && response.config.url !== '/api/v1/user/me') {
      store.dispatch('clearUser')
      // 允许游客进入
      if(response.data.code === ERROR_CODE.ERROR_CODE_CHECK_LOGIN) {
        // 401
        console.log(401)
        router.replace({name: 'login'})
      }
      else if(response.data.code === ERROR_CODE.ERROR_CODE_NO_PERMISSION) {
        // 403
        router.replace({name: 'no-permission'})
      }
      else if(response.data.code === ERROR_CODE.ERROR_CODE_NOT_FOUND) {
        // 404
        router.replace({name: 'not-found'})
      }
      return Promise.reject(response)
    }
    else {
      if(response.data.code !== 0 && response.config.url === '/api/v1/user/me') {
        console.log('clearuser')
        store.dispatch('clearUser')
      }
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
