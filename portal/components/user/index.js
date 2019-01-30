
import { setUserInfo } from '~/api.js'
import fn from '~/util'
import mixin from '~/mixin'
/*子组件引入*/
export default {
    name: "n-user",
    mixins: [mixin],
    props: ['dialogo'],
    data() {
        return {
            ruleForm: {
                id: '',
                loginName: "",
                userName: "",
                phone: "",
                email: ""
            },
            rules: {
                loginName: [
                    { required: true, message: this.$t('user.validate[0]'), trigger: 'blur' }
                ],
                userName: [
                    { required: true, message: this.$t('user.validate[1]'), trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: this.$t('user.validate[2]'), trigger: 'blur' }
                ],
                email: [
                    { required: true, message: this.$t('user.validate[3]'), trigger: 'blur' }
                ],

            },
            isReady: false
        }
    },
    created() {
        try {
            const that = this
            let user = this.$store.state.data
            if (user) {
                that.ruleForm.id = user.id
                that.ruleForm.loginName = user.loginName
                that.ruleForm.userName = user.userName
                that.ruleForm.phone = user.phoneNumber
                that.ruleForm.email = user.email
            }
            that.$nextTick(() => {
                that.isReady = true
            })
        } catch (e) {
            console.error(e)
        }

    },
    watch: {
        "ruleForm.phone"(val) {
            if (this.isReady) {
                this.dialogo.isChange = true
            }
        },
        "ruleForm.email"(val) {
            if (this.isReady) {
                this.dialogo.isChange = true
            }
        },
    },
    methods: {
        getWidth() {
            if (fn.getLang() !== 'en') {
                return '80px'
            } else {
                return '110px'
            }
        },
        cancelFunc() {
            this.dialogo.isDialogo = false
            this.dialogo.isChange = false
        },
        checkParams() {
            let phone = this.ruleForm.phone
            let email = this.ruleForm.email
            const phoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            const mailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
            let ret = 0;
            //手机号码检测
            if (!phone) {
                this.$message.warning(this.$t('user.validate[2]'));
                return false
            } else {
                if (phoneReg.test(phone)) {
                    ret++
                } else {
                    this.$message.warning(this.$t('user.validate[4]'))
                    return false
                }
            }
            //邮箱格式检测
            if (!email) {
                this.$message.warning(this.$t('user.validate[3]'));
                return false
            } else {
                if (mailReg.test(email)) {
                    ret++
                } else {
                    this.$message.warning(this.$t('user.validate[5]'))
                    return false
                }
            }

            return ret != 2 ? false : true
        },
        submitForm(formName) {
            if (this.dialogo.isChange) {
                if (!this.checkParams()) {
                    return
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submit()
                    } else {
                        // console.log('error submit!!')
                        return false
                    }
                })
            } else {
                this.$message.warning('当前界面数据未做修改')
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        async submit() {
            const that = this
            const req = {
                id: that.ruleForm.id || '',
                email: that.ruleForm.email || '',
                loginName: that.ruleForm.loginName || '',
                phoneNumber: that.ruleForm.phone || '',
                userName: that.ruleForm.userName || ''
            }
            const { data } = await setUserInfo(req)
            try {
                if (data && data.flag && data.flag.retCode === '0') {
                    that.alert(that.$t('user.msg'), 'success')
                    this.updateUser()
                    setTimeout(() => {
                        that.dialogo.isDialogo = false
                        that.dialogo.isChange = false
                    }, 1500)
                } else {
                    that.$message.error(data.flag.retMsg)
                }
            } catch (e) {
                that.$message.error('修改用户信息返回参数格式不匹配')
            }
        },
        updateUser() {
            let user = this.$store.state.data
            if (user) {
                user.id = this.ruleForm.id
                user.loginName = this.ruleForm.loginName
                user.userName = this.ruleForm.userName
                user.phoneNumber = this.ruleForm.phone
                user.email = this.ruleForm.email
                this.$store.commit('setUser', user)
            }

        }
    }
}
