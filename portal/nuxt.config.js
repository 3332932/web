const pkg = require('./package')
const webpack = require('webpack')
module.exports = {
    mode: 'spa', // universal
    render: {
        bundleRenderer: {
            cache: require('lru-cache')({
                max: 1000,
                maxAge: 1000 * 60 * 0.5
            })
        }
    },
    head: {
        title: 'Petrel 2018',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description },
            { 'http-equiv': 'pragma', content: 'no-cache' },
            { 'http-equiv': 'cache-control', content: 'no-cache' },
            { 'http-equiv': 'expires', content: '0' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }
        ]
    },
    loading: { color: '#fff' },
    css: [
        '@/assets/css/theme-gtp/index.css'
    ],
    plugins: [
        { src: '@/plugins/element-ui', ssr: true },
        { src: '@/plugins/route', ssr: true }
    ],
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {
        prefix: '/api/',
        proxy: false
    },
    proxy: {
    },
    build: {
        plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery'
            })
        ],
        // vendor: ['element-ui', 'localStorage', 'vue-i18n'],
        extend(config, ctx) {

        }
    }
}
