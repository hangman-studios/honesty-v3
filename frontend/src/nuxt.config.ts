// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  supabase: {
    url: process.env.API_EXTERNAL_URL,
    key: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
  },
  runtimeConfig: {
    webPushPrivateKey: '',
    webPushSubject: '',
    public: {
      webPushPublicKey: '',
    }
  },
});
