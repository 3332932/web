<template>
</template>
<script>
    import fp from '~/util'
    export default {
        props: ['config', 'menuData'],
        mounted() {
            fp.addEvent(this.refleshTag)
        },
        methods: {
            refleshTag(event) {
                const that = this
                const fn = (data) => {
                    if (data.type === 'refleshNowTag') {
                        that.menuData.tabs.forEach((tab, index) => {
                            if (tab.current) {
                                let url = tab.url
                                tab.url = ''
                                const fn = () => tab.url = url
                                setTimeout(fn, 200)
                            }
                        })
                    }
                }
                fp.handlePostMsg(event)(fn)
            }
        }
    }

</script>