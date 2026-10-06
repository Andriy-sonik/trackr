// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/eslint', '@nuxtjs/i18n'],
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
  i18n: {
    defaultLocale: 'en',
    langDir: '../app/i18/locales',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'uk', language: 'uk-UA', file: 'uk.json' },
    ],
  },
})
