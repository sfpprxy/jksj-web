import request from '@/utils/request'

export function applyWork(data) {
  return request({
    url: '/remote_work/apply',
    method: 'post',
    data
  })
}

export function applyStatus() {
  return request({
    url: '/remote_work/status',
    method: 'post'
  })
}

export function userInfo() {
  return request({
    url: '/user/get_info',
    method: 'post'
  })
}
