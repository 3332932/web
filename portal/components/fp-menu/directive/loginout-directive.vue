<template>
</template>
<script>
    import fp from '~/util'
    export default {
        props: ['config', 'menuData'],
        mounted() {
            fp.addEvent(this.handleLoginOut)
        },
        methods: {
            handleLoginOut(event) {
                const that = this
                const fn = (data) => {
                    if (event.data.type === 'loginout')
                        that.logout()
                }
                fp.handlePostMsg(event)(fn)
            },
            logout() {
                let obj = this.sessionHelper(sessionStorage).get('roleObj')
                if (obj) {
                    // 执行退出函数的状态修改
                    // this.$store.commit('changeModelState', true)
                    return
                }
                this.sessionHelper(sessionStorage).del('roleObjCache').del('roleObj')
                this.$router.push('/')
            }
        }
    }

</script>