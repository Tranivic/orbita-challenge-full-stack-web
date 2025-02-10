import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
    app: {
        pageTransition: false,
        layoutTransition: false,
    },
    devtools: { enabled: true },
    devServer: {
        port: 2121,
    },
    build: {
        transpile: ["vuetify"],
    },
    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }));
            });
        },
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    components: {
        global: true,
        dirs: ["~/components"],
    },
    compatibilityDate: "2025-01-31",
    runtimeConfig: {
        public: {
            baseApiURL: process.env.NUXT_ENV_URL_BASE_API,
        },
    },
});
