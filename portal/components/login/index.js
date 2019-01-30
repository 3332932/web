import pass from './subs/pass/index.vue'
import sms from './subs/sms/index.vue'
import fp from '~/util'
export default {
    data() {
        return {
            lang: localStorage.lang || 'cn',
            config: {
                type: 'pass'
            }
        }
    },
    created() {
        try {
            fp.clearUserInfo()
            fp.setMicroServiceApi()
            fp.printVersion()
        } catch (e) {
            console.error(e)
        }
    },
    watch: {
        lang(val, oVal) {
            if (val && val !== oVal) {
                localStorage.setItem('lang', val)
                window.location.reload()
            }
        }
    },
    components: {
        pass,
        sms
    }
}