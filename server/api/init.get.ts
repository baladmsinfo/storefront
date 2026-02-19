export default defineEventHandler(async (event) => {
  const hostHeader = getRequestHeader(event, "host");
  const tenant = event.context.tenant;

  const config = useRuntimeConfig(event)
  console.log(config.public)
  

  console.log("API request host:", hostHeader, "| Tenant:", tenant);

  // If tenant is not default, call backend
  if (tenant !== "default") {
    const url = config.public.STORE_BASE_URL + `/store/init/${tenant}`
    const data = await $fetch(url);
    return {
      tenant,
      ...data,
      message: "Tenant API working correctly"
    };
  }

  // Default tenant
  return {
    tenant,
    message: "Tenant API working correctly"
  };
});
