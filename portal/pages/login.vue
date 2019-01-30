<template>
    <login />
</template>
<script>
    import axios from 'axios'
    import login from '~/components/login/index.vue'
    export default {
        mounted() {
            // let that = this
            // setTimeout(function() {
            //     that.getData()
            // }, 5000)
            this.getData()
        },
        components: {
            login
        },
        methods: {
            getData() {
                $.get('/config.json', function(res) {
                    window.url = res.url ? location.protocol + '//' + res.url : ''
                    localStorage.setItem('portal-gateway', window.url)
                    window.env = res.env ? res.env : ''
                    localStorage.setItem('env', window.env)
                })
            }
        }
    }
</script>