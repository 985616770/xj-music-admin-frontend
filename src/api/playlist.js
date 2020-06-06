import ax from '@/utils/request'

const baseURL = 'http://localhost:3000'

export function fetchList(params) {
  return ax({
    params,
    url: `${baseURL}/playlist/list`,
    method: 'get'
  })
}

export function fetchById(params) {
  return ax({
    params,
    url: `${baseURL}/playlist/getById`,
    method: 'get'
  })
}

export function update(params) {
  return ax({
    url: `${baseURL}/playlist/updatePlaylist`,
    data: {
      ...params
    },
    method: 'post'
  })
}

export function del(params) {
  return ax({
    params,
    url: `${baseURL}/playlist/del`,
    method: 'get'
  })
}
