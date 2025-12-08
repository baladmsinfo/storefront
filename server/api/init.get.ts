export default defineEventHandler(async (event) => {
  const hostHeader = getRequestHeader(event, "host");
  const tenant = event.context.tenant;

  console.log("API request host:", hostHeader, "| Tenant:", tenant);

  // If tenant is not default, call backend
  if (tenant !== "default") {
    const data = await $fetch(`http://localhost:8080/api/store/init/${tenant}`);
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
