<template>
</template>
<script>
    import fp from '~/util'
    export default {
        props: ['config', 'menuData'],
        mounted() {
            fp.addEvent(this.AddTag)
        },
        methods: {
            AddTag(event) {
                const that = this
                event = event || window.event
                if (event.data.type === 'addtag') {
                    // 用于动态打开页面
                    let b = true
                    if (event.data.url) {
                        fp.each(function (it) {
                            if (it.id === event.data.id) {
                                b = false
                            }
                        }, that.menuData.navs)
                        if (b) {
                            that.menuData.navs.push({
                                "checked": false,
                                "current": false,
                                "children": [],
                                "hasChildren": false,
                                "icon": "0",
                                "id": event.data.id + "",
                                "resRightValue": 0,
                                "resourceId": "0",
                                "sequence": 0,
                                "text": event.data.title,
                                "url": event.data.url,
                                "userRightValue": 0
                            })
                        }
                    }
                    fp.each(function (it) {
                        if (it.id === event.data.id) {
                            that.$parent.openMenu(it)
                        }
                    }, that.menuData.navs)
                }
                if (event.data.type === 'activetag') {
                    const it = {
                        "checked": false,
                        "current": false,
                        "children": [],
                        "hasChildren": false,
                        "icon": "0",
                        "id": event.data.id + "",
                        "resRightValue": 0,
                        "resourceId": "0",
                        "sequence": 0,
                        "text": event.data.title,
                        "url": event.data.url,
                        "userRightValue": 0
                    }
                    that.$parent.activeOpenMenu(it)
                }
            }
        }
    }

</script>