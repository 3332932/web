/* eslint-disable */
import list from './data/tableData'
import column from './data/tableColumn'

export default {
  name: '',
  created () {

    this.getPermissionPage()
  },
  data () {

    return {
      permissionIdTemp: '',//分配角色时临时存放userId
      data: [],//角色表
      value1: [],//已分配的角色

      dialogVisible: false,
      permissionTable: [],
      value5: [],
      tableClass: {
        height: '50px'
      },
      pageInfo: {
        current: 1,
        total: 100,
        size: 20,
        sizes: [10, 20, 30, 40],
        prop: '',
        order: ''
      },
      ruleForm: {
        date: '',
        nickName: '',
        userId: ''
      },
      isshow: false,
      tableList: list,
      tableColumn: column
    }
  },
  watch: {},
  methods: {
    permissionSearch () {
      this.getPermissionPage()
    },
    getPermissionPage () {
      let para = this.ruleForm
      this.axios.get(this.pageSortUrlMake(this.$url.list.permissionList), para).then(response => {
        if (response.flag.retCode == '0') {
          this.tableList = response.data
          this.pageInfo.total = response.total
        } else {
          this.$message.error(response.flag.retMsg)
        }
      })
    },
    hs (val) {
      if (val) {
        this.isshow = true
      } else {
        this.isshow = false
      }
    },
    handleSizeChange (val) {
      this.sizeChangeUtil(val, null, this.getPermissionPage)
    },
    handleCurrentChange (val) {
      this.pageChangeUtil(val, null, this.getPermissionPage)
    },
    handSortChange (column) {
      this.sortChangeUtil(column, null, this.getPermissionPage)
    },
  },
  filters: {},
  mounted () {
    this.$nextTick(() => {
      let token = window.top.localStorage.getItem('token')
      document.domain = 'vip.cn'
      window.localStorage.setItem('token', token)
    })
  }
}
