
import { setUserPass } from '~/api.js'
import fn from '~/util.js'
import mixin from '~/mixin'
/*子组件引入*/
export default {
    name: "n-user",
    mixins: [mixin],
    props: ['dialogo'],
    data() {
        let validatePass = (rule, value, callback) => {
            let p1 = /[0-9]/i
            let p2 = /[a-z]/i
            if (value === '') {
                callback(new Error(this.$t('pass.validate[0]')))
            } else if (value && value.length < 6) {
                callback(new Error(this.$t('pass.validate[1]')))
            } else if (!p1.test(value) || !p2.test(value)) {
                callback(new Error(this.$t('pass.validate[2]')))
            } else {
                callback()
            }
        }
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('pass.validate2[0]')))
            } else if (this.ruleForm.newPass !== this.ruleForm.confirmPass) {
                callback(new Error(this.$t('pass.validate2[1]')))
            } else {
                callback()
            }
        }
        return {
            ruleForm: {
                loginName: '',
                oldPass: "",
                newPass: "",
                confirmPass: ""
            },
            rules: {
                oldPass: [
                    { required: true, message: this.$t('pass.validate[0]'), trigger: 'blur' }
                ],
                newPass: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                confirmPass: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            },
            isReady: false
        }
    },
    created() {
        try {
            const that = this
            let user = this.$store.state.data
            if (user) {
                that.ruleForm.loginName = user.loginName
                that.ruleForm.oldPass = user.oldPass
                that.ruleForm.newPass = user.newPass
                that.ruleForm.confirmPass = user.confirmPass
            }
        } catch (e) {
            console.error(e)
        }
    },
    methods: {
        getClass() {
            if (fn.getLang() !== 'en') {
                return 'txt'
            } else {
                return 'txt-en'
            }
        },
        getWidth() {
            if (fn.getLang() !== 'en') {
                return '80px'
            } else {
                return '150px'
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submit()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        async submit() {
            const that = this
            const req = {
                loginName: that.ruleForm.loginName || '',
                oldPassword: that.ruleForm.oldPass || '',
                newPassword1: that.ruleForm.confirmPass || '',
                newPassword2: that.ruleForm.newPass || ''
            }
            const { data } = await setUserPass(req)
            try {
                if (data && data.id) {
                    that.alert(that.$t('pass.msg2'), 'success')
                    setTimeout(() => {
                        that.dialogo.isDialogo = false
                    }, 1500)
                } else {
                    if(data && data.flag && data.flag.retMsg){
                        that.alert(data.flag.retMsg, 'error')
                    }
                }
            } catch (e) {
                console.error('修改用户密码返回数据格式不匹配')
            }
        }
    }
}
