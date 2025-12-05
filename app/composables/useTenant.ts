import { ref, onMounted } from "vue";

export const useTenant = () => {
  const tenant = ref({ tenant: "default", message: "" });

  // SSR fetch
  const fetchTenantSSR = async () => {
    const { data } = await useAsyncData("tenant", () => $fetch("/api/init"));
    tenant.value = data.value;
  };

  // Client-side fetch (browser hostname)
  const fetchTenantClient = async () => {
    const hostname = window.location.hostname;
    const tenantName = hostname.split(".")[0];

    const data = await $fetch("/api/init", {
      headers: { "x-tenant": tenantName }
    });

    tenant.value = data;
  };

  // Fetch tenant from SSR
  fetchTenantSSR();

  // Re-fetch tenant on client to correct it if SSR was default
  if (process.client) {
    onMounted(() => {
      fetchTenantClient();
    });
  }

  return { tenant };
};
