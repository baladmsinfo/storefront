export default defineEventHandler((event) => {
  // Prefer x-tenant header if passed (from client)
  const tenantHeader = getRequestHeader(event, "x-tenant");
  if (tenantHeader) {
    event.context.tenant = tenantHeader;
    console.log("🟩 Tenant detected via header:", tenantHeader);
    return;
  }

  // Otherwise detect from host header
  const hostHeader = getRequestHeader(event, "host") || "";
  const cleanHost = hostHeader.split(":")[0].toLowerCase();
  const parts = cleanHost.split(".");

  let tenant = "default";

  if (cleanHost === "localhost") tenant = "default";
  else if (cleanHost.endsWith(".localhost")) tenant = parts[0];
  else if (parts.length > 2 && parts[0] !== "www") tenant = parts[0];

  event.context.tenant = tenant;


    // Save tenant in cookies (SSR-safe)
  setCookie(event, "tenant", tenant, {
    httpOnly: false,   // must be accessible in client JS
    secure: false,     // true in production
    sameSite: "lax",
    path: "/"
  });

  console.log("🟩 Tenant detected via host:", tenant, "| Host:", cleanHost);
});
