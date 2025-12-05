<template>
  <div class="min-h-screen py-4 px-4 sm:px-6 lg:px-8 max-w-7xl md:py-10 mx-auto">
    
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Premium Products</h2>

      <!-- Filter button (mobile) -->
      <button
        @click="showFilter = !showFilter"
        class="lg:hidden px-3 py-1.5 bg-black text-white text-sm rounded-lg"
      >
        Filters
      </button>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
      
      <!-- Sidebar Filters -->
      <aside
        :class="[
          'bg-white w-full lg:w-72 border border-gray-200 rounded-2xl p-5 shadow-sm',
          showFilter ? 'block' : 'hidden lg:block'
        ]"
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

        <!-- CATEGORY FILTER -->
        <div class="mb-6">
          <label class="font-medium text-gray-700 block mb-2">Categories</label>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="toggleCategory(cat)"
              :class="[
                'px-3 py-1 rounded-lg text-sm border transition',
                selectedCategories.includes(cat)
                  ? 'bg-black text-white border-black'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Price -->
        <div class="mb-6">
          <label class="font-medium text-gray-700 block mb-1">Price Range</label>
          <div class="flex gap-2">
            <input v-model="minPrice" type="number" class="w-1/2 border rounded-lg px-2 py-1 text-sm" />
            <input v-model="maxPrice" type="number" class="w-1/2 border rounded-lg px-2 py-1 text-sm" />
          </div>
        </div>

        <!-- Brand -->
        <div class="mb-6">
          <label class="font-medium text-gray-700 block mb-1">Brands</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="brand in brands"
              :key="brand"
              @click="toggleBrand(brand)"
              :class="[
                'px-3 py-1 rounded-lg text-sm border transition',
                selectedBrands.includes(brand)
                  ? 'bg-black text-white border-black'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              ]"
            >
              {{ brand }}
            </button>
          </div>
        </div>

        <!-- Color -->
        <div class="mb-4">
          <label class="font-medium text-gray-700 block mb-1">Colors</label>
          <div class="flex gap-3 flex-wrap">
            <div
              v-for="c in colors"
              :key="c.name"
              @click="toggleColor(c.hex)"
              :style="{ backgroundColor: c.hex }"
              class="w-7 h-7 rounded-full border cursor-pointer transition"
              :class="selectedColors.includes(c.hex) ? 'border-black scale-110' : 'border-gray-300'"
            ></div>
          </div>
        </div>

        <button
          @click="clearFilters"
          class="mt-3 w-full text-center bg-red-500 text-white text-sm rounded-lg py-2"
        >
          Clear Filters
        </button>
      </aside>

      <!-- Product Grid -->
      <main class="flex-1">
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden relative"
          >
            <span
              v-if="product.discount"
              class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-md font-semibold"
            >
              -{{ product.discount }}%
            </span>

            <img :src="product.image" class="w-full h-44 sm:h-52 object-cover" />

            <div class="p-3">
              <h3 class="font-semibold text-gray-800 text-sm sm:text-base">
                {{ product.name }}
              </h3>

              <p class="text-xs text-gray-500">{{ product.category }}</p>

              <div class="flex items-center gap-2 mt-1">
                <p class="font-bold text-gray-900">${{ product.price }}</p>
                <p v-if="product.originalPrice" class="text-gray-400 text-xs line-through">
                  ${{ product.originalPrice }}
                </p>
              </div>

              <div class="flex gap-1 mt-2">
                <span
                  v-for="color in product.colors"
                  :key="color"
                  :style="{ backgroundColor: color }"
                  class="w-4 h-4 rounded-full border border-gray-300"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const showFilter = ref(false);

// CATEGORY FILTER
const categories = ["Shoes", "Jackets", "T-Shirts", "Sweaters"];
const selectedCategories = ref([]);

// PRICE
const minPrice = ref(0);
const maxPrice = ref(300);

// BRANDS
const brands = ["Nike", "Adidas", "Zara", "H&M", "Puma"];
const selectedBrands = ref([]);

// COLORS
const colors = [
  { name: "Black", hex: "#000000" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Green", hex: "#16a34a" },
  { name: "Red", hex: "#dc2626" },
];
const selectedColors = ref([]);

// PRODUCT LIST
const products = ref([
  {
    id: 1,
    name: "Nike Running Shoes",
    category: "Shoes",
    price: 120,
    originalPrice: 150,
    discount: 20,
    colors: ["#000", "#2563eb"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id: 2,
    name: "Winter Jacket",
    category: "Jackets",
    price: 190,
    colors: ["#000"],
    image: "https://images.unsplash.com/photo-1600185365234-94ff0e6f3f64"
  },
  {
    id: 3,
    name: "Casual T-Shirt",
    category: "T-Shirts",
    price: 40,
    colors: ["#dc2626"],
    image: "https://images.unsplash.com/photo-1556909193-0b15b8b3c6d0"
  },
  {
    id: 4,
    name: "Green Sweater",
    category: "Sweaters",
    price: 150,
    originalPrice: 170,
    discount: 12,
    colors: ["#16a34a", "#000"],
    image: "https://images.unsplash.com/photo-1528701800489-20be9c62c86e"
  },
]);

// FILTER COMPUTATION
const filteredProducts = computed(() =>
  products.value.filter((p) => {
    const matchCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(p.category);

    const matchPrice = p.price >= minPrice.value && p.price <= maxPrice.value;

    const matchBrand =
      selectedBrands.value.length === 0 ||
      selectedBrands.value.some((b) => p.name.toLowerCase().includes(b.toLowerCase()));

    const matchColor =
      selectedColors.value.length === 0 ||
      p.colors.some((c) => selectedColors.value.includes(c));

    return matchCategory && matchPrice && matchBrand && matchColor;
  })
);

// TOGGLE FUNCTIONS
const toggleCategory = (cat) => {
  selectedCategories.value.includes(cat)
    ? selectedCategories.value.splice(selectedCategories.value.indexOf(cat), 1)
    : selectedCategories.value.push(cat);
};

const toggleBrand = (b) => {
  selectedBrands.value.includes(b)
    ? selectedBrands.value.splice(selectedBrands.value.indexOf(b), 1)
    : selectedBrands.value.push(b);
};

const toggleColor = (c) => {
  selectedColors.value.includes(c)
    ? selectedColors.value.splice(selectedColors.value.indexOf(c), 1)
    : selectedColors.value.push(c);
};

// CLEAR ALL FILTERS
const clearFilters = () => {
  selectedBrands.value = [];
  selectedColors.value = [];
  selectedCategories.value = [];
  minPrice.value = 0;
  maxPrice.value = 300;
};
</script>
