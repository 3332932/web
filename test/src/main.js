// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import './config'
import router from './router'
import ElementUi from 'element-ui'
import axios from 'axios'
import ajax from './config/http'
import qs from 'Qs'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/main.css'

Vue.prototype.axios = axios
Vue.prototype.ajax = ajax
Vue.prototype.qs = qs
Vue.config.productionTip = false
Vue.use(ElementUi, {size: 'mini', zIndex: 3000})

axios.interceptors.request.use(
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
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(response => {
    if (response.data.flag.retCode.indexOf('1010') != -1) {
      let url = window.parent.location.href+'login'
      window.parent.location.href = url
    } else {
      if (response.data) {
        return response.data
      }

    }
  },
  error => {
    return Promise.reject(error)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
