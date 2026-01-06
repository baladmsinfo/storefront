// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devServer: {
    host: "0.0.0.0",
    port: 3001
  },
  ssr: true,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['./app/assets/css/tailwind.css'],
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      bucksboxPublicKey: process.env.BUCKSBOX_PUBLIC_KEY || "",
      STORE_BASE_URL: process.env.BUCKSBOX_BASE_URL || "http://localhost:8080/api",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    transpile: ["bucksbox-store-sdk"]
  }
});
