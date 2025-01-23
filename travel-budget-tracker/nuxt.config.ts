// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  future: { compatibilityVersion: 4 },
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@pinia/nuxt'],
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm', // OAuth 로그인 후 Supabase가 세션을 적용하기 위해 잠시 머무를 페이지 (이후 /로 이동)
      exclude: [],
    }
  },
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    public: {
      baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
    },
  }
})
