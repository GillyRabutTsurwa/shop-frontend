// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@pinia/nuxt", "@nuxtjs/sanity"],
    sanity: {
        projectId: process.env.SANITY_PROJECT_ID,
    },
    runtimeConfig: {
        stripe: {
            dev_key: process.env.STRIPE_PRIVATE_TEST_KEY,
            prod_key: process.env.STRIPE_PRIVATE_PROD_KEY,
        },
        public: {
            sanity: {
                projectId: process.env.SANITY_PROJECT_ID
            },
            client_url: {
               development: process.env.CLIENT_DEV_URL,
               production: process.env.CLIENT_PROD_URL 
            }
        },
    },
    app: {
        head: {
            script: [
                {
                    src: "https://kit.fontawesome.com/7a26a17053.js",
                    crossorigin: "anonymous",
                },
            ],
        },
    },
});
