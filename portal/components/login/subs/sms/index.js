import authCode from '../authCode/index.vue'

export default {
    props: ['config'],
    data() {
        return {
            userName: '',
            pass: '',
            loginBtnShow: true,   
            loginNum:0
        }
    },
    components: {
        authCode
    },
    mounted() {
        // 记录点击数量，显示验证码
        if(this.getCookie('codeNum') == 3){
            this.codeShow()
        }
    },
    methods: {
        getCookie(cookieName) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for(var i = 0; i < arrCookie.length; i++){
                var arr = arrCookie[i].split("=");
                if(cookieName == arr[0]){
                    return arr[1];
                }
            }
            return "";
        },
        logingo(logingo){
            this.loginBtnShow = logingo
        },
        codeShow(){
            this.$message({
                message: `${this.$t('login.authCode.message[0]')}`,
                type: 'warning'
              });
            this.loginBtnShow = false;
        },
        Logincheck(){
            this.loginNum++
            if(this.loginNum >3){
               document.cookie = 'codeNum=3;path=/'
                this.codeShow()
            }
        },
        passcode(codeInput,code_v){
            this.codeInput = codeInput
            this.code_v = code_v
        },
        checkCode() {
            let code_v = this.code_v
            let codeInput = this.codeInput
			if(code_v == codeInput) {
                //记录登陆失败次数
                document.cookie = 'codeNum=0;path=/'
                this.loginBtnShow = true 
                //登陆流程
                this.smsLogin()
			}else if(codeInput==""){
                this.$message.error(`${this.$t('login.authCode.message[2]')}`);
                return;
            }else{
				this.$message.error(`${this.$t('login.authCode.message[1]')}`);
                this.codeInput = ""
                return;
			}
            
        },
        smsLogin(){
            const that = this   
            console.log('手机验证码登陆功能待开发，默认登陆失败填写验证码')
            //登陆三次未成功，输入验证码
            that.Logincheck() 
        },
        smsLoginBtn(){
            const that = this   
            //登陆信息验证
            if (that.userName.trim() === '') {
                that.alert(that.$t('login.pass.error[0]'), 'warning')
                return
            } else if (that.pass.trim() === '') {
                that.alert(that.$t('login.pass.error[1]'), 'warning')
                return
                
            }else if(!that.loginBtnShow){
                //验证码验证
                that.checkCode()
            }else if(that.loginBtnShow){
                //登陆流程
                that.smsLogin()
            }
        },
    }
}