import axios from '~/plugins/axios'
import qs from 'qs'
import fp from '~/util'

let isLocal = process.env.NODE_ENV !== 'development'
let global = window
global.url = 'http://localhost:8085'
let p = '/petrel-priv-api/priv/api'

import config from '~/config'
// 是否打包成预览模式
let isPreview = config.mode !== 'preview'
// 获取系统列表
export function getSysList(userId) {
  if (isLocal) {
    return new Promise(function (resolve, reject) {
      resolve({
        data: {
          "flag": {
            "retCode": "0",
            "retMsg": "success"
          },
          "rows": [{
            "code": "P001",
            "id": 1,
            "name": "集成管理系统",
            "userId": "2",
            "gatewayUrl": "www.baidu.com/petrel"
          }, {
            "code": "P002",
            "id": 2,
            "name": "协同管理系统",
            "userId": "2",
            "gatewayUrl": "www.tms.com/petrel"
          }, {
            "code": "P003",
            "id": "1004209621892403201",
            "name": "条码中心",
            "userId": "2",
            "gatewayUrl": "www.lu.com/petrel"
          }, {
            "code": "P004",
            "id": "1012542699123576834",
            "name": "SRMAPP",
            "userId": "2",
            "gatewayUrl": "www.taobao.com/petrel"
          }]
        }
      })
    })
  } else {
    if (isPreview) {
      return axios.get('/sys.json')
    } else {
      return axios.get(global.url + '/petrel-priv-api/sysMenu/user-project?search.userId=' + userId)
    }
  }
}

// 获取菜单
export function getMenuData(req) {
  if (isLocal) {
    return new Promise(function (resolve, reject) {
      resolve({
        data: {
          "total": 3,
          "flag": {"retCode": "0", "retMsg": "success"},
          "rows": [{
            "id": "2",
            "text": "系统管理",
            "sequence": 2,
            "icon": "0",
            "resourceId": "0",
            "children": [{
              "id": "2001",
              "text": "平台租户管理",
              "sequence": 1,
              "icon": "0",
              "resourceId": "1",
              "url": "/uc-web/#/companys",
              "userRightValue": 4095,
              "resRightValue": 4095,
              "children": [],
              "hasChildren": false
            }, {
              "id": "2002",
              "text": "用户组织机构",
              "sequence": 2,
              "icon": "0",
              "resourceId": "2",
              "url": "/uc-web/#/organizations",
              "userRightValue": 7,
              "resRightValue": 7,
              "children": [],
              "hasChildren": false
            }, {
              "id": "1060714925983584257",
              "text": "编码规则",
              "sequence": 4,
              "icon": "0",
              "resourceId": "1060446727643717633",
              "url": "/uc-web/#/sysCodeRule",
              "userRightValue": 15,
              "resRightValue": 15,
              "children": [],
              "hasChildren": false
            }, {
              "id": "1060714926008750082",
              "text": "数据字典维护",
              "sequence": 5,
              "icon": "0",
              "resourceId": "1060446951820877825",
              "url": "/uc-web/#/sysDict",
              "userRightValue": 15,
              "resRightValue": 15,
              "children": [],
              "hasChildren": false
            }],
            "hasChildren": true
          }, {
            "id": "1060715020271538177",
            "text": "集成管理",
            "sequence": 3,
            "icon": "0",
            "resourceId": "0",
            "children": [{
              "id": "1060715399017189377",
              "text": "项目清单",
              "sequence": 0,
              "icon": "0",
              "resourceId": "3",
              "url": "/uc-web/#/sysProject",
              "userRightValue": 7,
              "resRightValue": 7,
              "children": [],
              "hasChildren": false
            }, {
              "id": "1060715399038160897",
              "text": "资源列表",
              "sequence": 1,
              "icon": "0",
              "resourceId": "4",
              "url": "/uc-web/#/sysResource",
              "userRightValue": 127,
              "resRightValue": 127,
              "children": [],
              "hasChildren": false
            }, {
              "id": "1060715399054938114",
              "text": "菜单管理",
              "sequence": 2,
              "icon": "0",
              "resourceId": "9",
              "url": "/uc-web/#/sysMenu",
              "userRightValue": 127,
              "resRightValue": 127,
              "children": [],
              "hasChildren": false
            }],
            "hasChildren": true
          }, {
            "id": "1060715505384738818",
            "text": "权限管理",
            "sequence": 4,
            "icon": "0",
            "resourceId": "0",
            "children": [{
              "id": "1060715707986399233",
              "text": "用户管理",
              "sequence": 0,
              "icon": "0",
              "resourceId": "5",
              "url": "/uc-web/#/sysuser",
              "userRightValue": 511,
              "resRightValue": 511,
              "children": [],
              "hasChildren": false
            }, {
              "id": "1060715708007370753",
              "text": "角色管理",
              "sequence": 1,
              "icon": "0",
              "resourceId": "6",
              "url": "/uc-web/#/role",
              "userRightValue": 31,
              "resRightValue": 31,
              "children": [],
              "hasChildren": false
            }, {
              "id": "1060715957366640642",
              "text": "用户权限查询",
              "sequence": 2,
              "icon": "0",
              "resourceId": "10",
              "url": "/uc-web/#/sysUserPermission",
              "userRightValue": 127,
              "resRightValue": 127,
              "children": [],
              "hasChildren": false
            }, {
              "id": "1060715957391806466",
              "text": "数据权限",
              "sequence": 3,
              "icon": "0",
              "resourceId": "1057465348295274497",
              "url": "/uc-web/#/sysDataPrivilege",
              "userRightValue": 15,
              "resRightValue": 15,
              "children": [],
              "hasChildren": false
            }],
            "hasChildren": true
          }]
        }
      })
    })
  } else {
    if (isPreview) {
      return axios.get('/menu.json')
    } else {
      if (!req) {
        return
      }
      return axios.get(global.url + '/petrel-priv-api/sysMenu/userMenus?' + qs.stringify(req))
    }
  }
}

// 密码登录
export function doLoginByPass(req) {
  if (isLocal) {
    return new Promise(function (resolve, reject) {
      resolve({
        data: {
          "flag": {"retCode": "0", "retMsg": "success"},
          "data": {
            "admin": true,
            "companyId": 1,
            "deleted": false,
            "email": "1@ad1.com",
            "icon": "5b6957ffde01af0001493aa1",
            "id": 2,
            "isAdmin": true,
            "loginName": "admin",
            "orgId": 1,
            "phoneNumber": "13512342345",
            "userName": "超级管理员"
          },
          "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..ahd-7Qt0tat2U3nn.PgdfvnMwr2GgJiVa_5AxcdXqaNjmRIJ4Jf4P9sZnGGV3GjpaZbhoOdVWs6l4VyeTDWtwSbx-JIgU8W25W0uQn4yRTSPYYOxU3OHLqvxvpwLRyfRhztrNUp77d53_Zqkv6Jgj_3_3a65VYSQgW96jTkWEDQ3us7Hm3aazt8IrsmF1mB6VQsvR8nbBTcFwdxvGAGhmWlSviEFb4gOgUEdd6u-OzDoWrehmXUnpQIY62heNb6ZcUkIp6WQaaQF73LD0NDtPjefX4Mr8GNcD1DQR5MNK0npwJ7OwS-Y9kLzP4DuCAt0Iurkhc3zUtjNzetMxnPOA8SeRv_lzyzJiB2pGoyrYy5JkzS5Yfz8Ped8fdMSfNkviCtqeFWEBa2nOm5_gXTtLGd6tiadC6gy5OqJ6egT_3nAbSY_6lE5ArZ9wqSp77BkRFHnK1mjknBTmzXmrFJ3ERWJAdzxHHK2fSVimApRPOYGsGUBOQv6R0e_QVVbMeFyQ0ewgs24-qNlE3yNVMiAqcbOv8PfrEbbByCH8qQDiF_d_79eKJCxkiNOuTq_Yxe2wZOiOQWUcilgcZ9vgIm4VQsrIxitzvkuoHlvKJM2f3m_bnIqhREh37T0uyjQmvgfseuzqbdwfZ_p75cUgYb_E002GZnbpdAAFq4lQZ4gE1e4C3wyk0UYpu38xxmZU1gVKOAPMSBeUxYk.mmAz4aPyyQ983a3qR99VwA"
        }
      })
    })
  } else {
    if (!isPreview) {
      return axios.get('/login.json')
    } else {
      if (!req) {
        return
      }
      let param = {
        userName: 'admin',
        password: 'admin'
      }

      console.log(param)
      return axios.post('http://localhost:8085' + '/login', param)
    }
  }
}

// 修改用户信息
export function setUserInfo(req) {
  if (isLocal) {
    return new Promise(function (resolve, reject) {
      resolve({data: {"flag": {"retCode": "0", "retMsg": "success"}}})
    })
  } else {
    if (isPreview) {
      return
    } else {
      if (!req) {
        return
      }
      return axios.put(global.url + '/petrel-uc-api/sysUser', req)
    }
  }
}

// 修改用户密码
export function setUserPass(req) {
  if (isLocal) {
    return new Promise(function (resolve, reject) {
      resolve({data: {"flag": {"retCode": "0", "retMsg": "success"}}})
    })
  } else {
    if (isPreview) {
      return
    } else {
      if (!req) {
        return
      }
      return axios.get(global.url + '/petrel-uc-api/sysUser/changePassword?' + qs.stringify(req))
    }
  }
}

// 获取上传用户信息图像URl
export function getUploadImageUrl() {
  return (global.url + '/petrel-uc-api/sysUser/uploadIcon')
}

export function getUserImageUrl() {
  let random = (new Date).getTime()
  return (global.url + `/petrel-uc-api/sysUser/showIcon?random=${random}`)
}

// 获取websocket的URL
export function getSocket() {
  if (global.url) {
    let index = global.url.lastIndexOf('/petrel')
    return (global.url.substr(0, index) + '/petrel-uc-api/notification?')
  }
}

//获取版本信息
export function getVersionInfo(projectId) {
  if (isLocal) {
    return new Promise(function (resolve, reject) {
      resolve({data: {"flag": {"retCode": "0", "retMsg": "success"}, "sysEnvVersion": "开发环境", "versionNo": '2.1.2'}})
    })
    // return axios.get(`${global.url}/petrel/petrel-itg-api/sysVersion/${projectId}/latestVersion`)
  } else {
    if (isPreview) {
      return
    } else {
      return axios.get(`${global.url}/petrel-itg-api/sysVersion/${projectId}/latestVersion`)
    }
  }
}

//获取公告信息
export function getNoticeInfo() {
  return axios.get(`${global.url}/petrel-itg-api/sysNotice/latest_5`)
}
