import { doLoginByPass } from '~/api'
import mixin from '~/mixin'
import authCode from '../authCode/index.vue'
export default {
    mixins: [mixin],
    props: ['config'],
    data() {
        return {
            userName: '',
            pass: '',
            loginBtnShow: true,   //组件显示
            loginNum: 0,          //登陆错误次数
            codeCorrect: false,   //验证码验证是否正确
            loading:false

        }
    },
    components: {
        authCode
    },
    mounted() {
        this.enterHander()
        // 记录点击数量，显示验证码
        if (this.getCookie('codeNum') == 3 && !this.retMsgError) {
            this.codeShow()
        }
    },
    methods: {
        getCookie(cookieName) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (cookieName == arr[0]) {
                    return arr[1];

                }
            }
            return "";
        },
        logingo(logingo) {
            this.loginBtnShow = logingo
        },
        passcode(codeInput, code_v) {
            this.codeInput = codeInput
            this.code_v = code_v
        },
        checkCode() {
            let code_v = this.code_v
            let codeInput = this.codeInput
            if (codeInput && code_v && code_v == codeInput ) {
                //记录登陆失败次数
                document.cookie = 'codeNum=0;path=/'
                this.loginBtnShow = true
                //验证码验证正确
                this.codeCorrect = true
                //登陆流程
                this.passLogin()
            } else if (codeInput == "") {
                this.$message.error(`${this.$t('login.authCode.message[2]')}`);
            } else {
                this.$message.error(`${this.$t('login.authCode.message[1]')}`);
                this.codeInput = ""
                return;
            }

        },
        codeShow() {
            if (!this.codeCorrect  &&this.getCookie('codeNum') == 0) {
                this.$message({
                    message: `${this.$t('login.authCode.message[0]')}`,
                    type: 'warning'
                });
            }
            this.loginBtnShow = false;
        },
        Logincheck() {
            this.loginNum++
            if (this.loginNum > 3) {
                document.cookie = 'codeNum=3;path=/'
                this.codeShow()
            }
        },
        enterHander() {
            $('.user').focus()
            $(document).keyup(function (event) {
                if (event.keyCode == 13) {
                    $(".login_btn").trigger("click")
                }
            })
        },
        passLoginBtn() {
            const that = this
            //登陆信息验证
            if (that.userName.trim() === '') {
                that.alert(that.$t('login.pass.error[0]'), 'warning')
                return
            } else if (that.pass.trim() === '') {
                that.alert(that.$t('login.pass.error[1]'), 'warning')
                return

            } else if (!that.loginBtnShow) {
                //验证码验证
                that.checkCode()
            } else if (that.loginBtnShow) {
                //登陆流程
                that.passLogin()
            }
        },
        async passLogin() {
            const that = this
            const { data } = await doLoginByPass({
                username: that.userName,
                password: that.pass,
                remember: true
            })
            that.loading=true
            try {
                if (data && data.flag && data.flag.retCode === "0") {
                    that.loading=false
                    document.domain='vip.cn'
                    window.name
                    localStorage.setItem('user', JSON.stringify(data.data))
                    localStorage.setItem('token', data.token)
                    this.$router.push('/')
                } else {
                    if (data && data.flag) {
                        that.loading=false
                        that.alert(data.flag.retMsg, 'error')
                        that.retMsgError = data.flag.retMsg
                    } else {
                        that.loading=false
                        that.alert(that.$t('login.pass.error[2]'), 'error')
                    }
                    //登陆三次未成功，输入验证码
                    that.Logincheck()
                }
            } catch (e) {
              console.log(e)
                that.$message.error('登陆操作返回数据格式错误')
            }
        }
    }
}
