import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'

function getLang() {
    if (true) {
        if (localStorage.lang == 'zh') {
            let locale = require('element-ui/lib/locale/lang/zh-TW').default
            return Vue.use(Element, { locale })
        } else if (localStorage.lang == 'en') {
            let locale = require('element-ui/lib/locale/lang/en').default
            return Vue.use(Element, { locale })
        } else {
            return Vue.use(Element)
        }
    } else {
        return Vue.use(Element)
    }
}

export default () => {
    getLang()
}
