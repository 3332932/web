<template>
    <section class="container">
        <fp :sys="sys" :menu="menu" :now="now" />
    </section>
</template>

<script>
    import fp from '~/components/fp-menu/index.vue'
    import axios from '~/plugins/axios'
    import { getSysList, getMenuData } from '~/api'
    export default {
        components: {
            fp
        },
        async asyncData() {
            // asyncData用于首次加载某个页面时，在服务端进行渲染的操作
            // 请求系统
            let user = localStorage.getItem('user')
            if (user) {
                let obj = JSON.parse(user)

                let gateway = await axios.get('/config.json')
                window.url = gateway.data.url ? location.protocol + '//' + gateway.data.url : ''
                localStorage.setItem('portal-gateway', window.url)
                window.env = gateway.data.env ?  gateway.data.env : ''
                localStorage.setItem('env', window.env)
                let [sysData] = await Promise.all([
                    getSysList(obj.id)
                ])
                // console.log(sysData)
                try {
                    if (sysData.data.flag && sysData.data.flag.retCode === '0') {
                        if (sysData.data.rows && sysData.data.rows.length) {
                            // 默认取第一条
                            let id = sysData.data.rows[0].id
                            let now = {}
                            let projectCode = localStorage.getItem('projectCode')
                            if (projectCode) {
                                let arr = sysData.data.rows.filter((o) => o.code == projectCode)
                                now = arr.length === 0 ? sysData.data.rows[0] : arr[0]
                            } else {
                                now = sysData.data.rows[0]
                            }
                            localStorage.setItem('gateway', now.gatewayUrl ? (location.protocol + '//' + now.gatewayUrl) : '')
                            let index = { id: "-1", url: '', text: '首页' }
                            // 由后台返回地址
                            index.url = '/html/home.html'
                            now.index = index  // 用于记录和传递index信息，判断tabs是否可以关闭 
                            // 应该由后端返回
                            // now.bigIcon = '' // 图标
                            // now.smallIcon = '' // 小图标
                            let [menuData] = await Promise.all([
                                // getMenuData({ projectId: now.id, loginName: obj.loginName })
                                new Promise(function(resolve, reject) {
                                    resolve({data: []})
                                })
                            ])
                            return {
                                sys: sysData.data,
                                menu: menuData.data,
                                now: now
                            }
                        }
                    } else {
                        console.error(sysData.data.flag.retMsg)
                    }
                } catch (e) {
                    console.error('返回的系统列表格数据式不匹配')
                }
            }
        },
    }
</script>
<style>
</style>