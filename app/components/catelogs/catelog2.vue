<template>
  <div class="bg-gradient-to-br from-white to-slate-50 p-4 sm:p-10">
    <div class="mx-auto max-w-7xl">

      <!-- TITLE + VIEW ALL BUTTON -->
      <div class="flex items-center justify-between mb-6 sm:mb-8">
        <h2 class="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {{ title }}
        </h2>

        <!-- View All Button -->
        <NuxtLink
          v-if="viewAllLink"
          :to="viewAllLink"
          class="text-sm sm:text-base font-semibold text-indigo-600 hover:text-indigo-800 
                 transition underline underline-offset-4"
        >
          View All →
        </NuxtLink>
      </div>

      <!-- PRODUCT GRID -->
      <div
        v-if="products && products.length"
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-7"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4
                 shadow hover:shadow-lg transition-all duration-300
                 hover:scale-[1.02]"
        >

          <!-- PRODUCT CLICKABLE AREA -->
          <a href="javascript:void(0)" class="block">
            <div
              class="aspect-square bg-gradient-to-br from-slate-100 via-white to-slate-200 
                     rounded-xl p-3 sm:p-5 overflow-hidden"
            >
              <img
                :src="product.imageUrl || fallbackImage"
                :alt="product.name"
                class="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>

            <!-- NAME + PRICE -->
            <div class="flex gap-2 mt-3 sm:mt-4">
              <h5 class="text-sm sm:text-base font-semibold text-slate-900 truncate">
                {{ product.name }}
              </h5>
              <h6 class="text-sm sm:text-base text-slate-900 font-bold ml-auto">
                ₹{{ product.price || "0.00" }}
              </h6>
            </div>

            <p class="text-slate-600 text-xs sm:text-[13px] mt-1 sm:mt-2 line-clamp-2">
              {{ product.description }}
            </p>
          </a>

          <!-- ACTION BUTTONS -->
          <div class="flex items-center gap-2 mt-4 sm:mt-6">
            
            <!-- Wishlist -->
            <div
              class="bg-pink-200 hover:bg-pink-300 w-10 h-8 sm:w-12 sm:h-9 flex items-center justify-center
                     rounded-lg cursor-pointer shadow-sm hover:shadow-md transition"
              title="Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" class="fill-pink-700" viewBox="0 0 64 64">
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                />
              </svg>
            </div>

            <!-- Add to Cart -->
            <button
              type="button"
              class="text-xs sm:text-sm px-2 py-2 sm:px-3 w-full font-medium cursor-pointer 
                     bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide 
                     rounded-lg shadow-md hover:shadow-indigo-300 transition"
              @click="$emit('addToCart', product)"
            >
              Add
            </button>

          </div>

        </div>
      </div>

      <!-- EMPTY STATE -->
      <div
        v-else
        class="text-center py-20 text-slate-500 text-lg font-medium"
      >
        No products found.
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Products",
  },
  products: {
    type: Array,
    default: () => [],
  },
  fallbackImage: {
    type: String,
    default: "https://via.placeholder.com/300?text=No+Image",
  },
  viewAllLink: {
    type: String,
    default: "",  // Passed from parent like: `/category/${cat.id}`
  },
});

defineEmits(["addToCart"]);
</script>
