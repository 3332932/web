<template>
</template>
<script>
    import fp from '~/util'
    export default {
        props: ['config'],
        mounted() {
            fp.addEvent(this.handleFullScreen)
            fp.addEvent(this.handleHalfScreen)
        },
        methods: {
            handleFullScreen(event) {
                const that = this
                if (!document) return
                const getId = name => document.getElementById(name)
                const setClass = (name, css) => {
                    getId(name).className = css
                    return setClass
                }
                const fn = data => {
                    if (data.type === 'fullscreen')
                        setClass('content', 'contentFull')('iframes', 'iframesFull')('tabs', 'tabsFull')('main', 'mainFull')
                    if (data.type === 'fullscreen_image')
                        setClass('content', 'contentFull')('iframes', 'iframesFull_image')('tabs', 'tabsHide')('main', 'mainFull')
                }
                fp.handlePostMsg(event)(fn)
            },
            handleHalfScreen(event) {
                const that = this
                if (!document) return
                const getId = name => document.getElementById(name)
                const setClass = (name, css) => {
                    getId(name).className = css
                    return setClass
                }
                const fn = data => {
                    if (data.type === 'halfscreen') {
                        setClass('content', 'content')('tabs', 'tabs')('main', 'main bg-color')
                        setClass('iframes', 'iframes-with-tabs')
                    }
                    if (data.type === 'halfscreen_image') {
                        setClass('content', 'content')('tabs', 'tabs')('main', 'main bg-color')
                        setClass('iframes', 'iframes-with-tabs')
                    }
                }
                fp.handlePostMsg(event)(fn)
            }
        }
    }

</script>