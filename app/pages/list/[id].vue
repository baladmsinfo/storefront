<template>
  <div class="min-h-screen py-4 px-4 sm:px-6 lg:px-8 max-w-7xl md:py-10 mx-auto">

    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Explore Products</h2>
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
        :class="['bg-white w-full lg:w-72 border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-300', showFilter ? 'block' : 'hidden lg:block']"
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

        <!-- All Products -->
        <button
          @click="clearCategoryOnly"
          class="mb-4 px-4 py-2 rounded-lg text-sm border bg-gray-100 w-full text-left hover:bg-gray-200"
          :class="selectedCategory === null ? 'bg-black text-white border-black' : ''"
        >
          All Products
        </button>

        <!-- Categories -->
        <div class="mb-6">
          <label class="font-medium text-gray-700 block mb-2">Categories</label>
          <div class="flex flex-col space-y-2">
            <div v-for="cat in store.categories" :key="cat.id">
              <button
                @click="toggleCategory(cat)"
                :class="[
                  'px-3 py-1 rounded-lg text-sm border transition-all duration-150 w-full text-left flex justify-between items-center',
                  selectedCategory === cat.id
                    ? 'bg-black text-white border-black'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                ]"
              >
                <span>{{ cat.name }}</span>
                <svg
                  :class="{'transform rotate-90': isOpen(cat.id)}"
                  class="w-3 h-3 ml-2 transition-transform"
                  fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>

              <!-- Subcategories -->
              <transition name="accordion">
                <div v-show="isOpen(cat.id)" class="pl-4 mt-2 flex flex-col space-y-1">
                  <button
                    v-for="sub in cat.children || []"
                    :key="sub.id"
                    @click="toggleSubCategory(sub, cat)"
                    :class="[
                      'px-3 py-1 rounded-lg text-sm border transition-all duration-150 w-full text-left',
                      selectedSubCategory === sub.id
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300'
                    ]"
                  >
                    {{ sub.name }}
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- Price Range -->
        <div class="mb-6">
          <label class="font-medium text-gray-700 block mb-1">Price Range</label>
          <div class="flex space-x-2">
            <input
              v-model.number="minPrice"
              type="number"
              class="w-1/2 border rounded-lg px-2 py-1 text-sm"
              placeholder="Min"
            />
            <input
              v-model.number="maxPrice"
              type="number"
              class="w-1/2 border rounded-lg px-2 py-1 text-sm"
              placeholder="Max"
            />
          </div>
        </div>

        <!-- Clear Filters -->
        <button
          @click="clearFilters"
          class="mt-3 w-full text-center bg-red-500 text-white text-sm rounded-lg py-2 hover:bg-red-600 transition"
        >
          Clear All Filters
        </button>
      </aside>

      <!-- Main Area -->
      <main class="flex-1">

        <!-- Active Filter Chips -->
        <div v-if="hasActiveFilters" class="mb-4 flex flex-wrap items-center gap-2">
          <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
            <strong>Filters:</strong>
          </div>

          <button
            v-if="selectedCategoryLabel"
            @click="removeCategoryChip"
            class="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
          >
            <span>Category: {{ selectedCategoryLabel }}</span>
            <span class="text-xs">✕</span>
          </button>

          <button
            v-if="selectedSubCategoryLabel"
            @click="removeSubCategoryChip"
            class="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
          >
            <span>Sub: {{ selectedSubCategoryLabel }}</span>
            <span class="text-xs">✕</span>
          </button>

          <button
            v-if="isPriceFiltered"
            @click="removePriceChip"
            class="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
          >
            <span>Price: ₹{{ minPrice }} - ₹{{ maxPrice }}</span>
            <span class="text-xs">✕</span>
          </button>

          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="ml-2 text-sm px-3 py-1 rounded-full bg-red-100 hover:bg-red-200"
          >
            Clear All
          </button>
        </div>

        <!-- Loading -->
        <div v-if="initialLoading" class="text-center text-gray-500 py-16">
          Loading products...
        </div>

        <!-- Empty -->
        <div v-else-if="normalizedProducts.length === 0" class="text-center text-gray-500 py-16">
          No products found for selected filters.
        </div>

        <!-- Product Grid -->
        <!-- Product Grid -->
        <transition-group
          name="list-fade"
          tag="div"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 fade-in"
        >
          <div
            v-for="(p, i) in normalizedProducts"
            :key="p.id"
            class="product-card transform transition-all duration-300"
            :style="{ animationDelay: (i * 40) + 'ms' }"
          >
            <ProductsList1 
              :products="[p]" 
              @selectVariant="openVariantDialog" 
              @addToCart="onAddToCart" 
            />
          </div>
        </transition-group>

         <VariantDialog :open="dialog.open" :product="dialog.product" @close="dialog.open = false" />

        <!-- Sentinel for Infinite Scroll -->
        <div ref="sentinel" class="h-6"></div>

        <!-- Loading more -->
        <div v-if="loadingMore" class="text-center text-gray-500 mt-4">
          Loading more...
        </div>

        <!-- End of results -->
        <div v-if="allLoaded && normalizedProducts.length > 0" class="text-center text-gray-500 mt-4">
          End of results
        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useStore } from "@/stores/store";
import { useRoute } from "vue-router";
import { debounce } from "lodash-es";
import VariantDialog from "~/components/products/variantDialog.vue";

const store = useStore();
const route = useRoute();

/* UI / FILTER STATE */
const showFilter = ref(false);
const selectedCategory = ref(null);
const selectedSubCategory = ref(null);
const minPrice = ref(0);
const maxPrice = ref(null);
const openCategories = ref([]);

/* PAGINATION / INFINITE SCROLL */
const page = ref(1);
const take = ref(20);
const loadingMore = ref(false);
const initialLoading = ref(true);
const allLoaded = ref(false);
const sentinel = ref(null);

/* normalize products for UI */
const normalizedProducts = ref([]);

/* LABEL GETTERS */
const selectedCategoryLabel = computed(() => {
  if (!selectedCategory.value) return null;
  const c = store.categories.find(x => x.id === selectedCategory.value);
  return c ? c.name : null;
});
const selectedSubCategoryLabel = computed(() => {
  if (!selectedSubCategory.value) return null;
  for (const c of store.categories) {
    const sub = (c.children || []).find(s => s.id === selectedSubCategory.value);
    if (sub) return sub.name;
  }
  return null;
});
const isPriceFiltered = computed(() => (minPrice.value > 0 || maxPrice.value < 50000));
const hasActiveFilters = computed(() => !!(selectedCategoryLabel.value || selectedSubCategoryLabel.value || isPriceFiltered.value));

const dialog = reactive({ open: false, product: null });

const openVariantDialog = (product) => {
  dialog.open = true;
  dialog.product = product;
};

const onAddToCart = (product) => {
  store.addToCart(product);
};

/* -------------------------
   FETCH PRODUCTS WITH FILTERS
------------------------- */
const fetchPage = async (p = 1, append = false) => {
  if (loadingMore.value) return;
  loadingMore.value = p > 1;

  try {
    const result = await store.fetchProducts(
      p,
      take.value,
      selectedCategory.value || null,
      selectedSubCategory.value || null,
      minPrice.value ?? null,
      maxPrice.value ?? null
    );

    let returnedProducts = Array.isArray(result) ? result : (Array.isArray(store.products) ? store.products : []);
    const mapped = returnedProducts.map(prod => {
      let price = prod.items?.[0]?.price ?? prod.price ?? 0;
      let mrp = prod.items?.[0]?.MRP ?? prod.mrp ?? price;
      return { ...prod, price, mrp };
    });

    if (p === 1) normalizedProducts.value = mapped;
    else if (append) {
      const existingIds = new Set(normalizedProducts.value.map(x => x.id));
      const deduped = mapped.filter(x => !existingIds.has(x.id));
      normalizedProducts.value = normalizedProducts.value.concat(deduped);
    }

    allLoaded.value = returnedProducts.length < take.value;
  } catch (err) {
    console.error("fetchPage error", err);
  } finally {
    loadingMore.value = false;
    initialLoading.value = false;
  }
};

/* -------------------------
   DEBOUNCED FILTER RELOAD
------------------------- */
const reloadWithFilters = async () => {
  page.value = 1;
  allLoaded.value = false;
  await fetchPage(1, false);
};
const debouncedReload = debounce(reloadWithFilters, 300);

watch([selectedCategory, selectedSubCategory, minPrice, maxPrice], () => {
  debouncedReload();
});

/* -------------------------
   CATEGORY / SUBCATEGORY TOGGLE
------------------------- */
const toggleCategory = (cat) => {
  if (selectedCategory.value === cat.id) {
    selectedCategory.value = null;
    selectedSubCategory.value = null;
  } else {
    selectedCategory.value = cat.id;
    selectedSubCategory.value = null;
  }

  if (openCategories.value.includes(cat.id)) {
    openCategories.value = openCategories.value.filter(x => x !== cat.id);
  } else openCategories.value.push(cat.id);

  reloadWithFilters();
};

const toggleSubCategory = (sub, parentCat) => {
  selectedCategory.value = parentCat.id;
  selectedSubCategory.value = sub.id;
  if (!openCategories.value.includes(parentCat.id)) openCategories.value.push(parentCat.id);

  reloadWithFilters();
};

const isOpen = (catId) => openCategories.value.includes(catId);

/* -------------------------
   CHIP / CLEAR FILTERS
------------------------- */
const removeCategoryChip = async () => { selectedCategory.value=null; selectedSubCategory.value=null; await reloadWithFilters(); };
const removeSubCategoryChip = async () => { selectedSubCategory.value=null; await reloadWithFilters(); };
const removePriceChip = async () => { minPrice.value=0; maxPrice.value=null; await reloadWithFilters(); };
const clearCategoryOnly = async () => { selectedCategory.value=null; selectedSubCategory.value=null; openCategories.value=[]; minPrice.value=0; maxPrice.value=null; await reloadWithFilters(); };
const clearFilters = async () => { selectedCategory.value=null; selectedSubCategory.value=null; openCategories.value=[]; minPrice.value=0; maxPrice.value=null; await reloadWithFilters(); };

/* -------------------------
   ADD TO CART
------------------------- */
// const onAddToCart = (product) => console.log("Add to cart:", product);

/* -------------------------
   INFINITE SCROLL
------------------------- */
const handleIntersect = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting && !loadingMore.value && !allLoaded.value) {
      page.value++; 
      fetchPage(page.value, true);
    }
  }
};

onMounted(async () => {
  await store.fetchCategory?.();

  // Apply URL param
  const paramId = route.params.id?.toString();
  if (paramId) { selectedCategory.value = paramId; openCategories.value = [paramId]; }

  await fetchPage(1,false);

  const io = new IntersectionObserver(handleIntersect, { root:null, rootMargin:"300px", threshold:0.1 });
  await nextTick();
  if (sentinel.value) io.observe(sentinel.value);
});
</script>

<style>
/* Accordion */
.accordion-enter-active, .accordion-leave-active { transition: all 0.28s cubic-bezier(.2,.9,.2,1); }
.accordion-enter-from, .accordion-leave-to { max-height:0; opacity:0; transform:translateY(-6px); }
.accordion-enter-to, .accordion-leave-from { max-height:500px; opacity:1; transform:translateY(0); }

/* Product card animation */
.product-card { opacity:0; transform:translateY(12px); animation:rise 360ms ease forwards; }
@keyframes rise { from {opacity:0; transform:translateY(12px) scale(.995);} to {opacity:1; transform:translateY(0) scale(1);} }

/* Transition group fade */
.list-fade-enter-active, .list-fade-leave-active { transition: all 240ms ease; }
.list-fade-enter-from { opacity:0; transform:translateY(8px); }
.list-fade-enter-to { opacity:1; transform:translateY(0); }
.list-fade-leave-from { opacity:1; transform:translateY(0); }
.list-fade-leave-to { opacity:0; transform:translateY(-8px); }
</style>
