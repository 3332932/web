/* eslint-disable */
const install = function (Vue) {
  const url = new Vue({
    data() {
      return {
        list: {},
        web: 'http://localhost:8085'

      }
    },
    created () {
      this.list = {
        userList: this.web + '/user/list',
        roleList: this.web + '/role/list',
        roleGrantList: this.web + '/role/grant/list',
        roleGrant: this.web + '/role/grant',
        permissionList: this.web + '/permission/list',
        permissionGrantList: this.web + '/permission/grant/list',
        permissionGrant: this.web + '/permission/grant',
      }
    },
    watch: {

    },
    destroyed() {
    },
    methods: {
      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      }
    }
  })
  Vue.prototype.$url = url
}
export default install
