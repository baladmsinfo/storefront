<template>
  <NuxtLayout>
    <transition name="fade" mode="out-in">
      <NuxtPage />
    </transition>
  </NuxtLayout>
</template>

<script setup>

import { useTenant } from "~/composables/useTenant";

const { tenant } = useTenant();

watchEffect(() => {
  if(tenant.value.tenant != "default"){
    console.log("tenant", tenant.value);
  }
});

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Creepster&family=Cinzel+Decorative:wght@400;700&family=Orbitron:wght@400;700&display=swap"
    }
  ]
});

</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
