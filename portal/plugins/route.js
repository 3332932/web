import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import messages from '../i18n/langs'

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: localStorage.lang || 'cn',
    fallbackLocale: 'cn',
    messages
  })
  
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}


