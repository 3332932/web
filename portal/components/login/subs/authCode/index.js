
import gVerify from './gVerify.js'
export default {
    props: ['config','showCode'],
    data() {
        return {
            Code:'',
            logingo:true,
            codeInput:'',


        }
    },
    mounted() {
        this.GVerify = new GVerify("v_container");
        this.code_v = this.GVerify.refresh();
    },
    methods: {
        passCode(){
            let codeInput = this.codeInput.toLowerCase()
            let code_v = this.code_v.toLowerCase()
            this.$emit('passcode', codeInput,code_v)   
        },
        createCode() {
            this.Code = ''
            this.code_v = this.GVerify.refresh();
		}
        }
    }