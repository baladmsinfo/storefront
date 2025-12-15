<script setup>
import { computed } from "vue"
import { useTenant } from "~/composables/useTenant"

const { tenant } = useTenant()

// 🔥 Extract default banner safely
const defaultBanner = computed(() => {
  return tenant.value?.data?.banners?.[0] || null
})
</script>


<template>
  <section
    class="w-full bg-gradient-to-b from-white via-gray-50 border-gray-200 mb-2"
    v-if="defaultBanner"
  >
    <div
      class="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20
             grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      <!-- TEXT AREA -->
      <div class="space-y-6">
        <h1
          class="text-3xl sm:text-5xl font-extrabold leading-tight text-gray-900 tracking-wide"
        >
          {{ defaultBanner.title || "Discover Premium Elegance" }}
        </h1>

        <p class="text-gray-600 text-lg max-w-md leading-relaxed">
          {{ defaultBanner.description }}
        </p>

        <button
          class="px-8 py-3.5 bg-black text-white rounded-xl font-medium shadow-lg 
                 hover:bg-gray-900 active:scale-95 transition"
        >
          Shop Now
        </button>
      </div>

      <!-- IMAGE AREA -->
      <div class="flex justify-center">
        <div
          class="relative w-full max-w-md h-[260px] sm:h-[340px] md:h-[420px]
                 bg-gradient-to-b from-white/90 via-gray-100/70 to-white/20
                 rounded-2xl flex items-center justify-center overflow-hidden"
        >
          <img
            :src="defaultBanner.imageUrl"
            :alt="defaultBanner.title"
            class="max-w-full max-h-full object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Optional fallback -->
  <section v-else class="py-20 text-center text-gray-400">
    Loading banner...
  </section>
</template>
