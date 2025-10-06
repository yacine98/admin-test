import colors from 'vuetify/es5/util/colors'

export default {

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  generate: {
    fallback: true
  },



  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'PLATEFORME DE GESTION DES INSCRIPTIONS',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo-plateforme.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.css',
    "@/layouts/global.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/supabase.js',
    '~/plugins/api.js',
    '~/plugins/helpers.js',
    "~/plugins/vjsf",
    "~/plugins/TiptapVuetify.js",

    { src: '~/plugins/TiptapVuetify', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
  ],

  axios: {
    // baseURL: 'https://msas.ip3dev.com/api-mrv-ci/public/api',
    baseURL: 'https://localhost.com'
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          autoFetch: false
        },
        endpoints: {
          login: { url: 'login', method: 'post' },
          logout: null,
          user: false
        }
      }
    },
    redirect: false
  },
  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  /*   router: {
      middleware: ['isAdmin'],
    }, */


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: "#244b76",        // Bleu foncé — pour les boutons principaux, barres d’en-tête
          secondary: "#7aacdd",      // Bleu clair — pour les boutons secondaires, accents
          darksecondary: "#244b76",  // Réutilisé pour cohérence visuelle
          accent: "#888795",         // Gris neutre — reste utile pour les icônes ou fonds
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          hover: "#1e3d5f",       // pour les survols
          background: "#f5f9fc",  // fond très clair bleuté

        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib', /@koumoul/],
    transpile: ['vuetify/lib', "tiptap-vuetify"],
  },

  env: {
    // baseUrl: 'https://msas.ip3dev.com/api-mrv-ci/public/api',
    //  siteUrl: 'https://msas.ip3dev.com/api-mrv-ci/public/storage/',
    baseURL: 'https://localhost.com',
    siteUrl: 'https://localhost.com'




  }
}
