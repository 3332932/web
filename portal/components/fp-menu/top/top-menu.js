import fp from '~/util'
import { getMenuData, getVersionInfo } from '~/api.js'
import message from '../subs/message.vue'
export default {
    props: ['menuData', 'config', 'sys'],
    data() {
        return {
            lang: localStorage.lang || 'cn',
            state: '',
            // 用于存放序列化之后的菜单数组
            menuSearch: [],
            sysList: [],
            versionHtml: '',
            projectId: '',
            projectCode: ''
        }
    },
    components: {
        message
    },
    watch: {
        nowSys(val) {
            this.setProject(this.menuData.nowSys)
            this.updateMenu(val)
            this.getEnv()
            this.setGateWayCookie()
        }
    },
    computed: {
        nowSys() {
            return this.menuData.nowSys
        }
    },
    created() {
        try {
            const that = this
            if (that.sys && that.sys.rows && that.sys.rows.length) {
                that.sysList = that.sys.rows
                this.checkProjectIdFunc()
            }
        } catch (e) {
            console.error(e)
        }
    },
    mounted() {
        try {
            this.handleMenu()
        } catch (e) {
            console.error(e)
        }
    },
    methods: {
        setGateWayCookie() {
            let domain = localStorage.gateway || ''
            if (domain) {
                domain = domain.replace('http://', '').replace('https://', '')
                // console.log(domain)
                document.cookie = "token=" + this.$store.state.token + ';' + 'path=/;domain=' + domain
            }
        },
        handleCommandFunc(val) {
            localStorage.setItem('lang', val)
            window.location.reload()
        },
        checkProjectIdFunc() {
            try {
                //如果localStorage 中有projectId且 this.sys中也存在对应的id,那么就显示此Id对应的项目
                this.projectId = localStorage.getItem('projectId')
                this.projectCode = localStorage.getItem('projectCode')
                if (this.projectCode) {
                    let arr = this.sysList.filter((o) => o.code == this.projectCode)
                    if (arr && arr.length) {
                        this.menuData.nowSys = arr[0]
                    } else {
                        this.menuData.nowSys = this.sysList[0]
                        localStorage.setItem('projectId', '')
                        localStorage.removeItem('projectId')
                        localStorage.getItem('projectCode', '')
                        localStorage.removeItem('projectCode')
                    }
                } else {
                    this.menuData.nowSys = this.sysList[0]
                }
                this.navClickEvent(this.menuData.nowSys)
            } catch(e) {
                console.error(e)
            }
        },
        // 获取环境
        async getEnv() {
            if (!this.projectId) {
                return
            }

            //获取环境信息 key
            let user = this.$store.state.data
            try {
                if (user) {
                    let { data } = await getVersionInfo(this.projectId)
                    let env = localStorage.env || ''
                    let currentEnv = fp.getEnvInfo(env)
                    if (data.flag.retCode == '0') {
                        currentEnv.versionNo = data.versionNo || this.$t('main.noVer')
                        this.versionHtml = `<span class='container-env'><img src="/img/${currentEnv.img}" class="envImg" /><strong style="font-size:13px">${currentEnv.versionNo}</strong></span>`
                    } else {
                        this.versionHtml = `<span class='container-env'><img src="/img/${currentEnv.img}" class="envImg" /></span>`
                        // this.versionHtml = ''
                    }
                } else {
                    this.versionHtml = ''
                }
            } catch (e) {
                console.error(e)
            }
        },
        // 更新菜单
        async updateMenu(obj) {
            const that = this
            if (!obj.id) {
                return
            }
            let loginName = this.$store.state.data ? this.$store.state.data.loginName : ''
            const { data } = await getMenuData({ projectId: obj.id || '', loginName: loginName })
            try {
                if (data && data.flag && data.flag.retCode === "0") {
                    data.rows = data.rows ? data.rows : []
                    that.handleState(data.rows)
                    that.menuData.navs = []
                    that.$nextTick(() => {
                        that.menuData.navs = data.rows
                        // fp.iconHandle(that.menuData.navs)
                        that.handleMenu()
                    })
                }
            } catch (e) {
                this.$message.error('获取菜单信息数据格式不匹配')
            }
        },
        handleState(rows) {
            const that = this
            fp.each(function (it) {
                it.current = false
                it.checked = false
                it.gateway = localStorage.getItem('gateway') || ''
            }, rows)
            for (let i = 0; i < that.menuData.tabs.length; i++) {
                fp.each(function (it) {
                    if (it.id == that.menuData.tabs[i].id) {
                        it.checked = true
                        if (that.menuData.tabs[i].current) {
                            it.current = true
                        }
                        that.menuData.tabs[i] = it
                    }
                }, rows)
            }
        },
        openMenu(url, id, name) {
            window.parent.postMessage({ type: 'addtag', id: id, title: name, url: url }, '*')
        },
        activeOpenMenu(url, id, name) {
            window.parent.postMessage(
                {
                    type: 'activetag',
                    id: id || '',
                    title: name || '',
                    url: url || ''
                },
                '*')
        },
        // 将当前菜单中的项目序列化成数组
        handleMenu() {
            const that = this
            that.menuSearch = []
            const fn = (it) => {
                if (it.children && !it.children.length) {
                    it.value = it.text
                    that.menuSearch.push(it)
                }
            }
            fp.each(fn, that.menuData.navs)
        },
        querySearch(queryString, cb) {
            const that = this
            let results = queryString ? that.menuSearch.filter(this.createFilter(queryString)) : that.menuSearch;
            cb(results.slice(0, 5))
        },
        createFilter(queryString) {
            return (menuSearch) => {
                return (menuSearch.value.indexOf(queryString) >= 0)
            }
        },
        handleSelect(item) {
            this.openMenu(item.url, item.id, item.name)
        },
        navClickEvent(items, index) {
            const that = this
            that.config.bigIcon = items.bigIcon || ''
            that.config.smallIcon = items.smallIcon || ''
            that.menuData.nowSys = items
            let gateway = items.gatewayUrl ? (location.protocol + '//' + items.gatewayUrl) : ''
            localStorage.setItem('gateway', gateway)
            this.setProject(that.menuData.nowSys)
            // //向其他页面广播
            // window.postMessage({type:'reloadPage'},'*')
        },
        setProject(items) {
            //供日志界面使用
            this.projectId = items.id || ''
            this.projectCode = items.code || ''
            localStorage.setItem('projectId', this.projectId)
            this.$store.commit('updateProjectId', this.projectId)
            localStorage.setItem('projectCode', this.projectCode)
        },
        doCollapse() {
            this.config.status.isCollapse = !this.config.status.isCollapse
        },
        handleCommand(nav) {
            navClickEvent(nav, index)
        },
        openLog() {
            try {
                let gateway = localStorage.getItem('portal-gateway')
                this.activeOpenMenu(`/uc-web/${gateway ? '?gateway=' + gateway : ''}#/versionLogs`, -2, this.$t('main.logs'))
            } catch (e) {
                console.error(e)
            }
        },
        getInfoFunc() {
            console.log('info')
        },
        getConfFunc() {
            console.log('conf')
        }
    }
}