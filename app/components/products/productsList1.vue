<template>
  <div
    v-for="product in products"
    :key="product.id"
    class="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
  >
    <!-- Product Image -->
    <div class="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
      <img
        :src="product.imageUrl || fallbackImage"
        :alt="product.name"
        class="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
      />
    </div>

    <!-- Product Info -->
    <div class="px-4 py-3 flex flex-col flex-1">
      <h3 class="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center mt-2">
        <template v-for="i in 5" :key="i">
          <svg
            v-if="i <= (product.rating || 4)"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 0 0 .95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.96c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.96a1 1 0 0 0-.364-1.118L2.035 9.387c-.783-.57-.38-1.81.588-1.81h4.151a1 1 0 0 0 .951-.69l1.286-3.96z" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 0 0 .95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.96c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.96a1 1 0 0 0-.364-1.118L2.035 9.387c-.783-.57-.38-1.81.588-1.81h4.151a1 1 0 0 0 .951-.69l1.286-3.96z" />
          </svg>
        </template>
        <span class="ml-2 text-xs text-gray-500">({{ product.ratingCount || 50 }})</span>
      </div>

      <!-- Price -->
      <p class="mt-2 font-bold text-gray-900 text-lg">
        ₹{{ product.items?.[0]?.price || 0 }}
      </p>
    </div>

    <!-- Actions -->
    <div class="px-4 pb-4">
      <button
        class="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
        @click="$emit('selectVariant', product)"
      >
        Select Variant
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  products: Array,
  fallbackImage: { type: String, default: "https://via.placeholder.com/300?text=No+Image" },
});
const emit = defineEmits(["selectVariant", "addToCart"]);
</script>
