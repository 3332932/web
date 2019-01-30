import topMenu from './top/top-menu.vue'
import screenDirective from './directive/screen-directive.vue'
import refleshDirective from './directive/reflesh-directive.vue'
import tabs from './top/top-tabs.vue'
import leftMenu from './left-menu.vue'
import frame from './frame.vue'
import role from './subs/role.vue'
import config from '~/config'
import { getUserImageUrl } from '~/api.js'
// 是否打包成预览模式
let isPreview = config.mode === 'preview'
import '~/assets/css/main.css'
import fp from '~/util'
export default {
    name: "fp-menu",
    props: ['sys', 'menu', 'now'],
    components: {
        frame,
        tabs,
        leftMenu,
        topMenu,
        screenDirective,
        refleshDirective,
        role
    },
    data() {
        return {
            config: {
                index: null, // 用于记录和传递index信息，判断tabs是否可以关闭
                bigIcon: '', // 图标
                smallIcon: '', // 小图标
                status: {
                    isCollapse: false // 是否折叠
                },
                isReady: false,
                isHash: true //  是否使用hash值控制缓存
            },
            menuData: {
                nowMenuId: '',// 当前菜单id
                nowSys: {}, // 当前选中系统
                tabs: [], // tabs的数据，保持不清空
                tabChecked: '0', // 当前选中的tab id
                navs: [] // 左侧菜单
            },
            isPreview: isPreview
        }
    },
    created() {
        try {
            fp.printVersion()
            // sso处理
            fp.clearUserInfo()
            // alert(this.$route.query.token)
            // alert(this.$route.query.ssoHomeUrl)
            // alert(this.$route.query.data)
            if (this.$route.query.token) {
                let user = decodeURIComponent(this.$route.query.data)
                let base64 = this.b64DecodeUnicode(user)
                // alert(this.$route.query.token)
                localStorage.setItem('user', base64)
                localStorage.setItem('token', this.$route.query.token)
                localStorage.setItem('sso-home-url', this.$route.query.ssoHomeUrl)
                localStorage.setItem('projectCode', this.$route.query.code)
                location.href = window.location.origin;
            }
            this.init()
            this.$store.commit('updateUserImage', getUserImageUrl())
        } catch (e) {
            console.error(e)
        }
    },
    mounted() {
        try {
            // 防止浏览器退回
            fp.preventHistory()
            // 同步数值
            this.setData()
            // 判断是否登录
            this.isLogin()
            // 记录id
            this.menuData.nowMenuId = sessionStorage.getItem('history-menuid') || '-1'
            window.menu = this.menuData.navs
            if (this.$store.state.token) {
                document.cookie = "token=" + this.$store.state.token + ';' + 'path=/'
                document.cookie = "token=" + this.$store.state.token + ';' + 'path=/;domain=.belle.net.cn'
                document.cookie = "token=" + this.$store.state.token + ';' + 'path=/;domain=.belle.lan'
                let domain = localStorage.gateway || ''
                if (domain) {
                    domain = domain.replace('http://', '').replace('https://', '')
                    document.cookie = "token=" + this.$store.state.token + ';' + 'path=/;domain=' + domain
                }
               
            }
            let lang = localStorage.getItem('lang')
            if (lang) {
                document.cookie = "lan=" + fp.getLangStr(lang) + ';' + 'path=/'
            } else {
                document.cookie = 'lan=zh-CN' + ';' + 'path=/'
            }
        } catch (e) {
            console.error(e)
        }
    },
    methods: {
        b64EncodeUnicode(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                return String.fromCharCode('0x' + p1)
            }))
        },
        b64DecodeUnicode(str) {
            return decodeURIComponent(atob(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        },
        isLogin() {
            let token = this.$store.state.token
            if (!token) {
                fp.loginOut()
            } else {
                this.config.isReady = true
            }
        },
        setData() {
            let token = localStorage.getItem('token')
            if (token) {
                this.$store.commit('setToken', token)
            }
            let user = localStorage.getItem('user')
            if (user) {
                this.$store.commit('setUser', JSON.parse(user))
            }
        },
        init() {
            const that = this
            if (!that.sys) {
                return
            }
            that.config.bigIcon = that.now.bigIcon || ''
            that.config.smallIcon = that.now.smallIcon || ''
            if (that.now.index) {
                that.getMenu(that.menu, that.now.index)
            } else {
                that.getMenu(that.menu)
            }
        },
        getIcon() {
            if (process.env.NODE_ENV === 'development') {
                return `background-repeat: no-repeat;background-size: 230px 60px;height:60px;width:230px;`
            } else {
                if (!this.config.bigIcon) {
                    return 'background-repeat: no-repeat;background-size: 230px 60px;height:60px;width:230px;'
                }
                return `background-image: url(${window.url}${this.config.bigIcon});background-repeat: no-repeat;background-size: 230px 60px;height:60px;width:230px;`
            }
        },
        getSIcon() {
            if (process.env.NODE_ENV === 'development') {
                return `background-repeat: no-repeat;background-size: 36px 36px;margin: 12px auto;height:36px;width:36px;`
            } else {
                if (!this.config.smallIcon) {
                    return 'background-repeat: no-repeat;background-size: 36px 36px;margin: 12px auto;height:36px;width:36px;'
                }
                return `background-image: url(${window.url}${this.config.smallIcon});background-repeat: no-repeat;background-size: 36px 36px;margin: 12px auto;height:36px;width:36px;`
            }

        },
        getMenu(result, defaultIndex = { id: "-1", url: '/html/home.html', text: '首页' }) {
            const that = this

            // 设置首页
            this.config.index = defaultIndex
            // 打开首页
            const setData = obj => {
                obj.current = true
                obj.checked = true
                that.menuData.tabs.push(obj)
                that.menuData.tabChecked = String(obj.id)
            }
            setData(this.config.index)
            if (result && result.flag && result.flag.retCode == "0") {
                // 遍历处理所有菜单
                const setMenu = it => {
                    it.current = false
                    it.checked = false
                }
                fp.each(setMenu, result.rows || [])

                // 菜单赋值
                that.menuData.navs = result.rows || []
                // 菜单主图标处理
                // fp.iconHandle(that.menuData.navs)
            }
        }
    }
}