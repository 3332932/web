/* eslint-disable */
import list from './data/tableData'
import column from './data/tableColumn'

export default {
  name: '',
  created () {

    this.getUserPage()
  },
  data () {

    return {
      userIdTemp: '',//分配角色时临时存放userId
      data: [],//角色表
      value1: [],//已分配的角色

      dialogVisible: false,
      roleTable: [],
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
      userRuleForm: {
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

    showRole (row) {
      this.userIdTemp = row.userId
      this.value1 = []
      this.getRoleInfo()

    },
    userSearch () {
      this.getUserPage()
    },
    getUserPage () {
      let para = this.userRuleForm
      this.axios.get(this.pageSortUrlMake(this.$url.list.userList), para).then(response => {
        if (response.flag.retCode == '0') {
          this.tableList = response.data
          this.pageInfo.total = response.total
        } else {
          this.$message.error(response.flag.retMsg)
        }
      })
    },
    getRoleInfo () {
      this.axios.get(this.$url.list.roleGrantList, {params: {userId: this.userIdTemp}}).then(response => {
        if (response.flag.retCode == '0') {
          this.dialogVisible = true
          this.roleTable = []
          this.value1 = []
          response.distributable.forEach(item => {
            this.roleTable.push({
              key: item.roleId,
              label: item.roleName
            })
          })
          response.existRoles.forEach(item => {
            this.value1.push(
              item.roleId
            )
          })
        } else {
          this.$message.error(response.flag.retMsg)
        }
      })
    },
    roleSubmit () {
      this.dialogVisible = false
      let param = []
      if (this.value1.length > 0) {
        this.value1.forEach(e => {
          param.push(
            e
          )
        })
      } else {
        param.push([''])
      }
      let str = param.join(',')
      let data = {userId: this.userIdTemp, roleIdStr: str}
      this.ajax.post(this.$url.list.roleGrant, this.qs.stringify(data)).then(response => {
        if (response.flag.retCode == '0') {
          this.$message.success(response.flag.retMsg)
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
      this.sizeChangeUtil(val, null, this.getUserPage)
    },
    handleCurrentChange (val) {
      this.pageChangeUtil(val, null, this.getUserPage)
    },
    handSortChange (column) {
      this.sortChangeUtil(column, null, this.getUserPage)
    },
  },
  filters: {},
  mounted () {
    this.$nextTick(() => {
      //this.getPageData()
      //this.getbook()

      let token = window.top.localStorage.getItem('token')
      document.domain = 'vip.cn'
      window.localStorage.setItem('token', token)
    })
  }
}
