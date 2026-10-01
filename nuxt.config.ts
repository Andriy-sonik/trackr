// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/eslint'],
  css: ['~/assets/styles/main.css'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})