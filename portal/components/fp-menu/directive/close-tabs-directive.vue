<template>
</template>
<script>
    import fp from '~/util'
    export default {
        props: ['config', 'menuData'],
        mounted() {
            fp.addEvent(this.handleCloseTag)
        },
        methods: {
            handleCloseTag(event) {
                const that = this
                const fn = (data) => {
                    if (data.type === 'closetag') {
                        const id = data.id
                        if (id) {
                            const _removeTab = fp.removeTab(that.menuData)
                            _removeTab(id)
                        } else {
                            const _removeTab = fp.removeTab(that.menuData)
                            _removeTab(that.menuData.tabChecked)
                        }
                    }
                }
                fp.handlePostMsg(event)(fn)
            }
        }
    }

</script>