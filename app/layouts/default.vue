<template>
  <div class="min-h-screen flex flex-col bg-white-50 flex flex-col">
    <!-- Header -->
     <Header />

    <!-- Banner Slot / Section -->
    <!-- Page Content Slot -->
    <main class="flex-1">
     
        <slot />
      
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-6 mt-10">
      <div class="max-w-7xl mx-auto text-center">
        © 2025 My E-Commerce. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
// No JS needed here for now
</script>

<style scoped>
/* optional additional styling */
</style>
