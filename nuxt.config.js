export default {
  server: {
    port: process.env.PORT || 3000, // default: 3000
  },

  serverMiddleware: [
    // Will register file from project server-middleware directory to handle /server-middleware/* requires
    { path: '/api', handler: '~/api' },
  ],

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Create! Arts Festival',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'CREATE! Arts Festival is a new community initiative of the Eastside Arts Society, bringing together local artists and the community to explore, learn and CREATE! art together through a series of affordable and accessible art workshops, and a public-participation art installation. Attendees of all ages will learn how to CREATE! art such as block printing, felt making, glass blowing, ceramics and painting from Eastside artists in a safe and comfortable outdoor space this summer. ',
      },
      { hid: 'og:image', property: 'og:image', content: 'https://admin.createartsfestival.ca/app/uploads/CAF-logo.png' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'facebook-domain-verification',
        name: 'facebook-domain-verification',
        content: 'hjksnpuic51brqltdeinzsjfzbxvgh',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://admin.createartsfestival.ca/app/uploads/FAVICON-01.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@700&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vue-slick-carousel.js' }, { src: '~/plugins/repository.js' }, { src: '~/plugins/vue-smooth-scroll.js', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = function (hash, x = 0) {
        return (
          document.querySelector(hash) ||
          new Promise((resolve) => {
            if (x > 50) {
              return resolve(document.querySelector('#app'))
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1))
            }, 100)
          })
        )
      }

      if (to.hash) {
        const el = await findEl(to.hash)
        return window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 150, behavior: 'smooth' })
      }

      return { x: 0, y: 0 }
    },
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics',
    '@nuxtclub/slugify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dayjs'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://admin.createartsfestival.ca/wp-json',
  },

  googleAnalytics: {
    id: 'UA-208215606-1',
  },

  facebook: {
    /* module options */
    track: 'PageView',
    pixelId: '1410692249195903',
    autoPageView: true,
    disabled: false,
  },

  slugify: {
    globals: {
      lower: true,
    },
  },

  dayjs: {
    plugins: [
      'utc' // import 'dayjs/plugin/utc'
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'axios'
    ]
  },

  publicRuntimeConfig: {
    port: process.env.PORT,
    eventbriteAPI: process.env.ENV === 'prod' ? process.env.eventbriteAPIProd : process.env.eventbriteAPIDev
  },
}
