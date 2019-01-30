/* eslint-disable */
import list from './data/tableData'
import column from './data/tableColumn'

export default {
  name: '',
  created () {

    this.getRolePage()
  },
  data () {

    return {
      roleIdTemp: '',//分配角色时临时存放userId
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
      roleRuleForm: {
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

    showPermission (row) {
      this.roleIdTemp = row.roleId
      this.value1 = []
      this.dialogVisible = true
      this.getPermissionInfo()
    },
    roleSearch () {
      this.getRolePage()
    },
    getRolePage () {
      let para = this.roleRuleForm
      this.axios.get(this.pageSortUrlMake(this.$url.list.roleList), para).then(response => {
        if (response.flag.retCode == '0') {
          this.tableList = response.data
          this.pageInfo.total = response.total
        } else {
          this.$message.error(response.flag.retMsg)
        }
      })
    },
    getPermissionInfo () {
      this.axios.get(this.$url.list.permissionGrantList, {params: {roleId: this.roleIdTemp}}).then(response => {
        if (response.flag.retCode == '0') {
          this.permissionTable = []
          this.value1 = []
          response.distributable.forEach(item => {
            this.permissionTable.push({
              key: item.permissionId,
              label: item.description
            })
          })
          response.existPermission.forEach(item => {
            this.value1.push(
              item.permissionId
            )
          })
        } else {
          this.$message.error(response.flag.retMsg)
        }
      })
    },
    permissionSubmit () {
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
      let data = {roleId: this.roleIdTemp, permissionIdStr: str}
      this.ajax.post(this.$url.list.permissionGrant, this.qs.stringify(data)).then(response => {
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
      this.sizeChangeUtil(val, null, this.getRolePage)
    },
    handleCurrentChange (val) {
      this.pageChangeUtil(val, null, this.getRolePage)
    },
    handSortChange (column) {
      this.sortChangeUtil(column, null, this.getRolePage)
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
