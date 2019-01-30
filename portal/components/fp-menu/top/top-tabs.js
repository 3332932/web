import closePageDirective from '../directive/close-tabs-directive.vue'
import fp from '~/util'
export default {
    props: ['config', 'menuData'],
    components: {
        closePageDirective
    },
    data() {
        return {
            isReflesh: false,
            status: true,
            isShow: false,
            writeList: []
        }
    },
    mounted() {
        try {
            // 将首页加入清除标签的白名单
            if (this.config && this.config.index) {
                this.writeList.push(this.config.index.id)
                fp.addEvent(this.handleHidePage)
            }
        } catch (e) {
            console.error(e)
        }
    },
    computed: {
        tabChecked() {
            return this.menuData.tabChecked
        }
    },
    watch: {
        tabChecked(id) {
            const that = this
            const fn = item => {
                item.current = false
                if (item.id == id) {
                    item.current = true
                    that.menuData.nowMenuId = id
                    // 记录id
                    sessionStorage.setItem('history-menuid', id)
                    localStorage.setItem('powerId', item.userRightValue)
                }
            }
            that.menuData.tabs.forEach(fn)
        }
    },
    methods: {
        doReflesh(tab) {
            const that = this
            if (!that.isReflesh) {
                that.isReflesh = true
                let url = tab.url
                tab.url = '/html/loading.html'
                setTimeout(() => {
                    tab.url = url
                    that.isReflesh = false
                }, 300)
            }
        },
        handleHidePage(event) {
            const that = this
            const fn = data => {
                if (data.type === 'handleHidePage')
                    that.isShow = false
            }
            fp.handlePostMsg(event)(fn)
        },
        closeOtherPage() {
            const that = this
            const tabs = that.menuData.tabs
            const list = that.writeList
            tabs.forEach(tab => {
                if (!tab.current && list.indexOf(tab.id) === -1 && tab.id !== -1) {
                    that.removeTab(tab.id)
                }
            })
            this.isShow = false
        },
        tofull() {
            fp.postMsg({ type: 'fullscreen' })
            this.isShow = false
            this.status = false
        },
        tohalf() {
            fp.postMsg({ type: 'halfscreen' })
            this.isShow = false
            this.status = true
        },
        removeTab(id) {
            const that = this
            // that.menuData.nowMenuId = ''
            const _removeTab = fp.removeTab(that.menuData)
            _removeTab(id)
            this.$nextTick(()=> {
                this.$forceUpdate()
            })
        }
    }
}
