/* eslint-disable */
import Vue from 'vue'

function extracted (fn) {
  if (fn && typeof fn === 'function') {
    fn()
  } else {
    this.getPageData()
  }
}

Vue.prototype.sizeChangeUtil = function (val, pageInfo, fn) {
  if (pageInfo) {
    pageInfo.size = val
    extracted.call(this, fn)
  } else {
    this.pageInfo.size = val
    extracted.call(this, fn)
  }

}
Vue.prototype.pageChangeUtil = function (val, pageInfo, fn) {
  if (pageInfo) {
    pageInfo.current = val
    extracted.call(this, fn)
  } else {
    this.pageInfo.current = val
    extracted.call(this, fn)
  }

}
Vue.prototype.sortChangeUtil = function (column,pageInfo,fn){
  if (pageInfo) {
    pageInfo.order = column.order
    pageInfo.prop = column.prop
    extracted.call(this, fn)
  } else {
    this.pageInfo.order = column.order
    this.pageInfo.prop = column.prop
    extracted.call(this, fn)
  }

}

Vue.prototype.pageSortUrlMake = function (url, pageInfo) {
  let param1 = url + '?'
  if (pageInfo) {
    param1 += 'current=' + pageInfo.current
    param1 += '&size=' + pageInfo.size
    if (pageInfo.prop) {
      if (pageInfo.order) {
        param1 += '&column=' + pageInfo.prop + '&order=' + pageInfo.order
      }
    }
  } else {
    param1 += 'current=' + this.pageInfo.current
    param1 += '&size=' + this.pageInfo.size
    if (this.pageInfo.prop) {
      if (this.pageInfo.order) {
        param1 += '&column=' + this.pageInfo.prop + '&order=' + this.pageInfo.order
      }
    }
  }

  return param1

}


