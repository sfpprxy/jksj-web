import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/get_info',
    method: 'post',
    params: { token }
  })
}
