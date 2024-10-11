// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@unocss/nuxt", "@pinia/nuxt", "@nuxt/image"],
  srcDir: "src/",
  css: ["@unocss/reset/tailwind.css"],
  devtools: { enabled: false },
  routeRules: {
    "/login/**": { ssr: false },
  },
  runtimeConfig: {
    public: {
      mediaUrl: process.env.MAPAIPUC_PUBLIC_MEDIA_URL,
    },
  },
});
