import colors from "vuetify/es5/util/colors"

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins//vuetify_icons"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/vuetify"],

  vuetify: {
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: colors.teal.darken1,
          secondary: colors.teal.lighten4,
          accent: colors.red.darken4
        }
      }
    },
    icons: { values: { logo: { component: "Logo" } } }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  /*
   ** Netlify configuration
   */
  netlify: {
    redirects: [
      {
        from: "https://docs.geode-solutions.netlify.com/*",
        to: "https://docs.geode-solutions.com/:splat",
        status: 301,
        force: true
      }
    ]
  }
}
