<template>
    <div :class="getIframeClass()" id="iframes">
        <iframe class="iframe-page" v-for="(tab, index) in menuData.tabs" :key="tab.id" v-show="tab.current" scrolling="auto" :src="getFullUrl(tab)"
            :name="'iframe' + index"></iframe>
    </div>
</template>
<script>
    import qs from 'qs'
    import fp from '~/util'
    export default {
        props: ['menuData', 'config'],
        watch: {
            menuData: {
                handler(val) {
                    this.$forceUpdate()
                },
                deep: true
            }
        },
        methods: {
            getIframeClass() {
                return 'iframes-with-tabs'
            },
            getFullUrl(tab) {
                if (this.config.isHash) { // 采用hash方式
                    var obj = fp.parseUrl(tab.url)
                    // console.log('urlObj', obj)
                    let url = obj.protocol + '://' + obj.hostname + (obj.port ? ':' + obj.port : '') + obj.path
                    let query = qs.stringify(obj.query)
                    if (!tab.hash)
                        tab.hash = fp.getHash()
                    return url + '?hash=' + tab.hash + (query ? '&' + query : '') + (tab.gateway ? '&gateway=' + tab.gateway : '') + (obj.params[0] ? '#' + obj.params[0] : '')
                } else {
                    return tab.url
                }
            }
        }
    }

</script>
<style lang="less">
    .iframes-with-tabs {
        position: absolute;
        top: 34px;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        .iframe-page {
            width: 100%;
            height: 100%;
            border: none;
            background-color: #fff;
        }
    }

    .iframes-without-tabs {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        .iframe-page {
            width: 100%;
            height: 100%;
            border: none;
            background-color: #fff;
        }
    }
</style>