<template>
  <div class="p-4 sm:p-10 mx-auto max-w-7xl">
    <!-- TITLE + VIEW ALL + SUBTITLE -->
    <div
      class="flex justify-between items-center border-b border-gray-300 pb-4"
    >
      <div>
        <h2 class="text-slate-900 text-2xl sm:text-3xl font-bold">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-slate-600 mt-2 text-sm sm:text-base">
          {{ subtitle }}
        </p>
      </div>

      <!-- VIEW ALL BUTTON -->
      <NuxtLink
        v-if="viewAllLink"
        :to="viewAllLink"
        class="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-all duration-300 shadow-md"
      >
        View All →
      </NuxtLink>
    </div>

    <!-- PRODUCT GRID -->
    <div class="mt-8">
      <!-- Skeleton Loader -->
      <div
        v-if="loading"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <div
          v-for="i in 8"
          :key="i"
          class="animate-pulse rounded-xl bg-gray-200 h-52 sm:h-64"
        ></div>
      </div>

      <!-- Products -->
      <div
        v-else-if="products && products.length"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 fade-in"
      >
        <ProductsList1
          :products="products"
          @selectVariant="openVariantDialog"
          @addToCart="$emit('addToCart', $event)"
        />

        <VariantDialog
          :open="dialog.open"
          :product="dialog.product"
          @close="dialog.open = false"
        />
      </div>

      <!-- EMPTY STATE -->
      <div v-else class="text-center py-20 text-slate-500 text-lg font-medium">
        No products found.
      </div>
    </div>
  </div>
</template>

<script setup>
import VariantDialog from "~/components/products/variantDialog.vue";

defineProps({
  title: { type: String, default: "Hot list" },
  subtitle: {
    type: String,
    default: "Out the most popular and trending products.",
  },
  products: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  viewAllLink: { type: String, default: "" },
  fallbackImage: {
    type: String,
    default: "https://via.placeholder.com/300?text=No+Image",
  },
});

const dialog = reactive({ open: false, product: null });

const openVariantDialog = (product) => {
  console.log("openVariantDialog", product);
  
  dialog.open = true;
  dialog.product = product;
};
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
