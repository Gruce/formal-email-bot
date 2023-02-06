// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            gptApi: process.env.OPENAI_API_KEY
        }
    },
})
