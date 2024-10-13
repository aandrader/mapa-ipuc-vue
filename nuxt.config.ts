// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@unocss/nuxt", "@pinia/nuxt", "@nuxt/image", "@sidebase/nuxt-auth"],
  srcDir: "src/",
  css: ["@unocss/reset/tailwind.css", "unocss-ui/style.css", "uno.css"],
  devtools: { enabled: false },
  routeRules: {
    "/login/**": { ssr: false },
    "/admin/**": { ssr: false },
  },
  runtimeConfig: {
    public: {
      mediaUrl: process.env.MAPAIPUC_PUBLIC_MEDIA_URL,
    },
  },
  auth: {
    isEnabled: true,
    globalAppMiddleware: true,
    provider: {
      type: "authjs",
      trustHost: true,
      defaultProvider: "credentials",
      addDefaultCallbackUrl: "/",
    },
  },
});
