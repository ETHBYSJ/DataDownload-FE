import request from './request'

export default {
  // 创建下载会话
  downloadSession(data) {
    return request({
      url: '/api/v1/file/download_session',
      method: 'get',
      params: data
    })
  },
  // 处理一些特殊文件的下载
  downloadStatic(data) {
    return request({
      url: '/api/v1/file/download_static',
      method: 'post',
      data: data,
      responseType: 'blob'
    })
  },
  download(data) {
    return request({
      url: '/api/v1/file/download',
      method: 'post',
      data: data,
      responseType: 'blob'
    })
  },
  setShare(data) {
    return request({
      url: '/api/v1/file/set_share',
      method: 'get',
      params: data
    })
  },
  createFolder(data) {
    return request({
      url: '/api/v1/file/create',
      method: 'put',
      params: data
    })
  },
  renameFile(data) {
    return request({
      url: '/api/v1/file/rename',
      method: 'get',
      params: data
    })
  },
  listDir(data) {
    return request({
      url: '/api/v1/file/list',
      method: 'get',
      params: data
    })
  },
  listDirByKeyword(data) {
    return request({
      url: '/api/v1/file/list_by_keyword',
      method: 'get',
      params: data
    })
  },
  merge(data) {
    return request({
      url: '/api/v1/file/merge',
      method: 'get',
      params: data
    })
  },
  delete(data) {
    return request({
      url: '/api/v1/file/delete',
      method: 'get',
      params: data
    })
  }
}
