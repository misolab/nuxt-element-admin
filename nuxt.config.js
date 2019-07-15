export default {
  mode: 'spa',
  env: {
    isLocal: process.env.NODE_ENV === 'development' ? true : false
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '嗨玩商户管理平台',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_1255678_i4h9bit3pi7.css'}
    ]
  },

  router: {
    middleware: 'logged-in',
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#19be6b',
    height: '5px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css',
    'element-ui/lib/theme-chalk/index.css',
    'animate.css/animate.min.css',
    '~/assets/css/page-transition.css',
    '~/assets/css/main.css',

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'cookie-universal-nuxt',
  ],
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
