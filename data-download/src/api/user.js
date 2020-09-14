import request from './request'

export default {
  login(data) {
    return request({
      url: '/api/v1/user/login',
      method: 'post',
      data: data
    })
  },
  logout() {
    return request({
      url: '/api/v1/user/logout',
      method: 'get'
    })
  },
  register(data) {
    return request({
      url: '/api/v1/user/register',
      method: 'post',
      data: data
    })
  },
  activate_request(data) {
    return request({
      url: '/api/v1/user/request_validate',
      method: 'post',
      data: data
    })
  },
  activate(data) {
    return request({
      url: '/api/v1/user/activate',
      method: 'post',
      data: data
    })
  },
  getUserInfo() {
    return request({
      url: '/api/v1/user/me',
      method: 'get',
    })
  },
  getProfile() {
    return request({
      url: '/api/v1/user/profile',
      method:'get'
    })
  },
  setLanguage(data) {
    return request({
      url: '/api/v1/user/language',
      method: 'get',
      params: data
    })
  },
  getMyFiles(data) {
    return request({
      url: '/api/v1/user/my_files',
      method: 'get',
      params: data
    })
  }
}
