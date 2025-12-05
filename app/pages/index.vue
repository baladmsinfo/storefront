<template>
  <div>
    <Banner2 />

    <!-- Loop through categories and render product section per category -->
    <div v-for="cat in categories" :key="cat.id">
      <CatelogsCatelog3
        :title="cat.name"
        :products="cat.products"
        :viewAllLink="`/list/${cat.id}`"
        @addToCart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue"
import { useStore } from "@/stores/store"

import Banner2 from "~/components/banners/banner2.vue"

const store = useStore()

const categories = computed(() => store.categories)


const openVariantDialog = (product) => {
  dialog.open = true;
  dialog.product = product;
};

onMounted(async () => {
  try {
    await store.fetchProducts()
    await store.initializeCart()
    await store.fetchCategory()  // loads categories + 10 products each
  } catch (err) {
    console.error("SDK error:", err)
  }
})
</script>
