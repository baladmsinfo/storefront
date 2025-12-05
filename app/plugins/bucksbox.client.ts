import { BucksboxSDK } from "bucksbox-store-sdk";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const cookieTenant = useCookie("tenant");
  console.log("Tenant from cookie:", cookieTenant.value);
  const sdk = new BucksboxSDK(cookieTenant.value, {
    baseURL: config.public.STORE_BASE_URL,
  });

  return {
    provide: {
      bucksbox: sdk,
    },
  };
});
