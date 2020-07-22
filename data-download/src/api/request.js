import axios from 'axios'
import router from '../router'
import store from '../store'
import {ERROR_CODE} from "../utils/constants";

const service = axios.create({
  timeout: 1500000
})

service.interceptors.response.use(
  response => {
    if(response.data.code && response.data.code !== 0 && response.config.url !== '/api/v1/user/me') {
      // 允许游客进入
      if(response.data.code === ERROR_CODE.ERROR_CODE_CHECK_LOGIN) {
        store.dispatch('clearUser')
        // 401
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
      if(response.data.code && response.data.code !== 0 && response.config.url === '/api/v1/user/me') {
        store.dispatch('clearUser')
      }
      return response
    }
  },
  error => {
    let message = error.message

    if(message.indexOf(ERROR_CODE.ERROR_CODE_NO_PERMISSION) !== -1) {
      // 403
      router.push({name: 'no-permission'})
    }
    else if(message.indexOf(ERROR_CODE.ERROR_CODE_NOT_FOUND) !== -1) {
      // 404
      router.push({name: 'not-found'})
    }
    else if(message.indexOf(ERROR_CODE.ERROR_CODE_CHECK_LOGIN) !== -1) {
      store.dispatch('clearUser')
      // 401
      router.push({name: 'login'})
    }
    return Promise.reject(error)
  }
)

export default service
