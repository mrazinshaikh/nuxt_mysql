import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "nuxt-icon", // list all icons https://icones.js.org/collection/all
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@tailvue/nuxt",
    '@nuxtjs/device',
  ],

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  },
});
