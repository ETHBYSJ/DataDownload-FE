import request from './request'

export default {
  listUser(data) {
    return request({
      url: '/api/v1/admin/list_user',
      method: 'get',
      params: data
    })
  },
  updateUserStatus(data) {
    return request({
      url: '/api/v1/admin/update_status',
      method: 'get',
      params: data
    })
  },
  createUser(data) {
    return request({
      url: '/api/v1/admin/create_user',
      method: 'post',
      data: data
    })
  }
}
