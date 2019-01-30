// 添加事件
const addEvent = fn => {
    if (window.addEventListener) {
        window.addEventListener('message', fn, false)
    } else {
        window.attachEvent('onmessage', fn)
    }
}

// 遍历树形结构
const each = (fn, arr) => {
    arr.i || (arr.i = 0)
    if (arr.length > 0 && fn.constructor === Function) {
        while (arr.i < arr.length) {
            let e = arr[arr.i]
            if (e.children.length !== 0) {
                each(fn, e.children)
            } else {
                fn.call(e, e)
            }
            arr.i++
        }
        arr.i = null
    }
    return arr
}

// 阻止退回历史记录
const preventHistory = () => {
    if (!history) return
    if (!document) return
    history.pushState(null, null, document.URL)
    if (window.addEventListener) {
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL)
        }, false)
    } else {
        window.attachEvent('onpopstate', function () {
            history.pushState(null, null, document.URL)
        })
    }
}

const loginOut = () => {
    let protocol = window.location.protocol
    let host = window.location.host
    localStorage.setItem('token', '')
    localStorage.setItem('user', '')
    localStorage.setItem('powerId', '')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('powerId')
    delCookie('token')
    let ssoUrl = localStorage.getItem('sso-home-url')
    if(ssoUrl){
        localStorage.setItem('sso-home-url', '')
        localStorage.removeItem('sso-home-url')
        window.location.href = ssoUrl
    }else{
        if (protocol == 'https:') {
            window.location.href = 'https://' + host + "/login/"
        } else {
            window.location.href = "/login/"
        }
    }
}

const printVersion = () => {
    console.log('petrel-portal 版本：1.0.0.RC11')
}

function delCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    document.cookie = name + "=;path=/;expires=" + exp.toGMTString()
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg))
        return (arr[2])
    else
        return null
}

function clearUserInfo() {
    let userFlag = getCookie('userFlag')
    if (!userFlag) {
        loginOut()
        document.cookie = 'userFlag=1;path=/'
    }
}

const parseUrl = (url) => {
    let a = document.createElement('a')
    a.href = url
    return {
        protocol: a.protocol.replace(':', ''),
        hostname: a.hostname,
        port: a.port,
        path: a.pathname,
        query: (() => {
            let query = a.search.substr(1)
            let queryArr = query.split('&')
            let queryObj = {}
            queryArr.forEach((item, index) => {
                let myItem = item.split('=')
                let key = myItem[0]
                queryObj[key] = myItem[1]
            })
            return queryObj
        })(),
        params: (() => {
            let params = a.hash.substr(1)
            let paramsArr = params.split('#')
            return paramsArr
        })()
    }
}
// const addTab = (opts) => {
//     let obj = {
//         type: "addtag",
//         title: opts.title ? opts.title : 'new Page',
//         url: opts.href.indexOf('http') === 1 ? opts.href : (location.protocol + '//' + location.host + opts.href),
//         id: opts.title
//     }
//     window.postMessage(obj, '*')
// }

// // window.addTab = addTab

// const tabsClose = (opts) => {
//     alert('tabsClose')
//     let obj = {
//         type: "closetag"
//     }
//     window.postMessage(obj, '*')
// }

// window.tabsClose = tabsClose

// 图标处理
const iconHandle = arr => {
    let i = 0
    const fn = it => {
        i++
        if (i % 2 === 0) {
            it.icon = 'icon-1'
        } else {
            it.icon = 'icon-2'
        }
    }
    arr.forEach(fn)
}
const getEnvInfo = (type) => {
    // "env": "env-dev"
    // "env": "env-test"
    // "env": "env-uat"
    // "env": "env-prod"
    let envInfo = [
        {
            img: 'dev.png',
            sysEnvVersion: '开发环境',
            versionNo: '0.0.0',
            type: 'env-dev'
        }, {
            img: 'test.png',
            sysEnvVersion: '测试环境',
            versionNo: '0.0.0',
            type: 'env-test'
        }, {
            img: 'train.png',
            sysEnvVersion: '培训环境',
            versionNo: '0.0.0',
            type: 'env-uat'
        }, {
            img: 'pro.png',
            sysEnvVersion: '生产环境',
            versionNo: '0.0.0',
            type: 'env-prod'
        }
    ]
    let tmp = envInfo.filter( o => o.type == type)[0]
    tmp = tmp || envInfo[0]
    return tmp;
}
// 向父页面发指令
const postMsg = (data, fn) => {
    window.parent.postMessage(data, '*')
}
// 向兄弟页面发指令
const postMsgToFrame = data => {
    const list = window.parent.frames
    const arr = _.toArray(list)
    arr.forEach(item => {
        item.postMessage(data, '*')
    })
}

const toArray = (list) => {
    const arr = []
    for (let i = 0; i < list.length; i++) {
        arr[i] = list[i]
    }
    return arr
}

const handlePostMsg = event => {
    event = event || window.event
    return fn => {
        fn(event.data)
    }
}

// 获取hash时间戳
const getHash = () => (new Date()).getTime()

// sessionStorage操作类
const sessionHelper = (sessionStorage) => {
    const _session = sessionStorage
    return {
        del(key) {
            _session.removeItem(key)
            return this
        },
        get(key) {
            return _session.getItem(key)
        },
        set(key, val) {
            _session.setItem(key, val)
            // console.log(111, this)
            return this
        }
    }
}

// 处理关闭事件
const removeTab = menuData => {
    return (targetId) => {
        let activeId = menuData.tabChecked
        let nowTab = null
        if (activeId == targetId) {
            menuData.tabs.forEach((tab, index) => {
                if (tab.id == targetId) {
                    nowTab = menuData.tabs[index]
                    let nextTab = menuData.tabs[index + 1] || menuData.tabs[index - 1]
                    if (nextTab) {
                        activeId = nextTab.id
                    }
                }
            })
            menuData.tabChecked = String(activeId)
        } else {
            menuData.tabs.forEach((tab, index) => {
                if (tab.id == targetId) {
                    nowTab = menuData.tabs[index]
                }
            })
        }
        menuData.tabs = menuData.tabs.filter(tab => tab.id != targetId)
        if (nowTab) {
            nowTab.checked = false
            if (nowTab.current) {
                nowTab.current = false
                return
            }
        }
    }
}

const getLang = () => {
    return localStorage.lang || 'cn'
}

// 语言判断
const getLangStr = str => {
    if (str === 'cn') {
        return 'zh-CN'
    } else if (str === 'en') {
        return 'en-US'
    } else if (str === 'zh') {
        return 'zh-TW'
    }
}

const setMicroServiceApi = () => {
    //导入和导出中心
    localStorage.setItem('poi-center-api', '/petrel-poi-center-api/')
    //文件中心
    localStorage.setItem('file-center-api', '/petrel-file-center-api/')
}
export default {
    addEvent: addEvent,
    each: each,
    postMsg: postMsg,
    postMsgToFrame: postMsgToFrame,
    preventHistory: preventHistory,
    handlePostMsg: handlePostMsg,
    removeTab: removeTab,
    sessionHelper: sessionHelper,
    getHash: getHash,
    toArray: toArray,
    iconHandle: iconHandle,
    loginOut: loginOut,
    getCookie: getCookie,
    delCookie: delCookie,
    parseUrl: parseUrl,
    getLang: getLang,
    getLangStr: getLangStr,
    clearUserInfo: clearUserInfo,
    setMicroServiceApi: setMicroServiceApi,
    printVersion: printVersion,
    getEnvInfo: getEnvInfo
}