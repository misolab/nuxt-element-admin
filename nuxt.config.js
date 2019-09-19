export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '共需宝管理中心',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//at.alicdn.com/t/font_1255678_i4h9bit3pi7.css'
      }
    ]
  },

  router: {
    // middleware: 'logged-in',
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
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
    '~/plugins/element-ui',
    '~/plugins/global-component',
    '~/plugins/axios'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'http://0.0.0.0:8000/console-api',
    https: false,
    debug: true,
  },

  transition: {
    name: 'el-fade-in-linear',
    mode: 'out-in',
  },
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
