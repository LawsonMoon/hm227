import axios from 'axios'
import router from '../router'
import JSONBIG from 'json-bigint'

// const tokenStr = JSON.parse(window.sessionStorage.getItem('hm'))
axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// if (tokenStr) {
//   axios.defaults.headers.authorizations = `Bearer${tokenStr.token}`
// }

// 添加请求拦截器
axios.interceptors.request.use(config => {
  const tokenStr = JSON.parse(window.sessionStorage.getItem('hm')) || {}
  config.headers.Authorization = `Bearer ${tokenStr.token}`
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
