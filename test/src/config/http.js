import ajax from 'axios'
import qs from 'qs'
ajax.interceptors.request.use(
    config => {
      config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
      config.timeout = 6000
      document.domain = 'vip.cn'
      let token = window.localStorage.getItem('token')
      if (token) {
        config.headers = {
          'token': token
        }
      }
      config.headers['Content-type'] = 'application/x-www-form-urlencoded'
      return config
    },
    err => {
        return Promise.reject(err)
    })
export default ajax
