import openPageDirective from './directive/open-page-directive.vue'
import fp from '~/util'
export default {
    props: ['menuData', 'config'],
    components: {
        openPageDirective
    },
    methods: {
        openMenu(item) {
            const that = this
            if (item.current) return
            if (item.checked) {
                let n = 0
                for (let [m, ele] of that.menuData.tabs.entries()) {
                    if (ele.id == item.id) {
                        n = m
                        break
                    }
                }
                that.resetCurr(n)
                that.menuData.tabChecked = item.id + ""
            } else {
                // 同时打开页签数量
                let num = 20
                if (that.menuData.tabs.length >= num) {
                    this.$alert(that.$t('main.tabs[0]') +` ${num} ` + that.$t('main.tabs[1]'), that.$t('main.tabs[2]'), {
                        confirmButtonText: that.$t('main.tabs[3]')
                    })
                    return
                }
                that.resetCurr()
                item.current = true
                item.checked = true
                that.menuData.tabs.push(item)
                that.menuData.tabChecked = item.id + ""
                if (!item.url)
                    item.url = '#/frame/error'
                if (!item.hash)
                    item.hash = fp.getHash()
            }
        },
        check(id, list) {
            for (let i = 0; i < list.length; i++) {
                if (id == list[i].id) {
                    return true
                }
            }
            return false
        },
        // 动态添加菜单tabs
        activeOpenMenu(item) {
            const that = this
            if (!that.check(item.id, that.menuData.tabs)) {
                that.menuData.tabs.push(item)
                that.menuData.tabChecked = item.id + ""
                if (!item.url)
                    item.url = '#/frame/error'
                if (!item.hash)
                    item.hash = fp.getHash()
            } else {
                that.menuData.tabChecked = item.id + ""
            }
        },
        // 获取样式
        getClass(item) {
            if (item.current) {
                return 'is-actived'
            }
            return ''
        },
        // 关闭其他标签
        resetCurr(n) {
            const that = this
            const setIndex = n => {
                if (n && typeof n === 'number')
                    that.menuData.tabs[n].current = true
            }
            that.menuData.tabs.forEach(item => item.current = false)
            setIndex(n)
        },
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
            sessionStorage.setItem('history-menuid', '')
        },
        getIcon(icon) {
            if (icon == 0) {
                icon = ""
            }
            if (icon) {
                return `background-image: url(${window.url}${icon});width: 14px;height: 14px;background-size: 100% 100%;`
            }
            return ''
        },
        getClass(icon) {
            if (icon == 0) {
                icon = ""
            }
            if (icon) {
                return ``
            }
            return 'el-icon-circle-plus'
        }
    }
}
