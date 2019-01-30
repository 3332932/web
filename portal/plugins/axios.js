import axios from 'axios'
import { Loading } from 'element-ui'
import fp from '~/util'
let timeOut
let loading
let needLoadingRequestCount = 0
function startLoading(target) {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)',
        spinner: "el-icon-loading",
        target: target,
        fullscreen: true
    })
}

function showLoading(target) {
    if (needLoadingRequestCount === 0) {
        startLoading(target)
    }
    needLoadingRequestCount++
}

function endLoading() {    //使用Element loading-close 方法
    loading.close()
}

function hideLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

axios.interceptors.request.use(
    config => {
        // 执行环境判断
        if (process && process.client) {
            if (config.url.indexOf('findUserMenus') > -1) {
                showLoading('.leftMenu')
            } else {
                showLoading()
            }
            // 以最后一次请求300毫秒之后为标准
            clearTimeout(timeOut) // 清空上一个定时器
            timeOut = setTimeout(function () { // 重新定义定时器
                loading.close()
                needLoadingRequestCount = 0
            }, 300)
            //  token判断
            let token = localStorage.getItem('token')
            if (token) {
                config.headers.token = token
            } else { // 如果不存在token
                const isWrite = url => {
                    const writelist = ['/login', 'api.myjson.com/bins/']
                    for (let i = 0; i < writelist.length; i++) {
                        if (url.indexOf(writelist[i]) > -1) {
                            return true
                        }
                    }
                    return false
                }
                if (!isWrite(config.url)) {
                    fp.loginOut()
                }
            }

            
            let lang = localStorage.getItem('lang')
            if (lang) {
                config.headers['lan'] = fp.getLangStr(lang)
            } else {
                config.headers['lan'] = 'zh-CN'
            }
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })

axios.interceptors.response.use(
    response => {
        if (process && process.client) {
            if (response && response.data && response.data.flag && response.data.flag.retCode == "1011") {
                // alert(response.data.flag.retCode, response.data.flag.retMsg)s
                if(process.env.NODE_ENV !== 'development'){
                    fp.loginOut()
                }
            }
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)
export default axios