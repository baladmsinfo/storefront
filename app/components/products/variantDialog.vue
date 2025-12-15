<template>
  <Transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col"
      >
        <div
          class="p-6 border-b border-gray-200 flex justify-between items-center"
        >
          <h3 class="text-2xl font-bold text-slate-900">{{ product?.name }}</h3>
          <button
            @click="$emit('close')"
            class="text-gray-500 hover:text-gray-900"
          >
            &times;
          </button>
        </div>

        <div class="p-6 space-y-4">
          <div
            v-for="item in product?.items"
            :key="item.id"
            class="border border-gray-300 rounded-xl p-4 cursor-pointer transition-all hover:bg-purple-50"
            :class="{
              'border-purple-600 bg-purple-50 scale-[1.02]':
                selected?.id === item.id,
            }"
            @click="selected = item"
          >
            <div class="flex justify-between items-center">
              <p class="text-lg font-semibold">
                {{ item.variantName || item.sku }}
              </p>
              <p class="text-purple-700 font-extrabold text-xl">
                {{ $formatPrice(item.price) }}
              </p>
            </div>
            <p>
              MRP: <strike>{{ $formatPrice(item.MRP) }}</strike> {{ $formatPrice(item.price) }}
            </p>
            <p v-if="item.stock === 0" class="text-red-600 font-semibold">
              Out of Stock
            </p>
            <p v-else class="text-gray-500 text-sm mt-1">
              Stock: {{ item.quantity }}
            </p>
            <p v-if="item.description" class="text-gray-700 text-sm mt-2">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 flex gap-4">
          <button
            class="w-1/2 py-3 border border-gray-500 rounded-lg text-gray-700 font-semibold hover:bg-gray-100"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            class="w-1/2 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            :disabled="!selected"
            @click="addToCart"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "@/stores/store";

const { $formatPrice } = useNuxtApp();

const props = defineProps({
  open: Boolean,
  product: Object,
});
const emit = defineEmits(["close"]);

const store = useStore();
const selected = ref(null);

watch(
  () => props.product,
  () => (selected.value = null)
);

const addToCart = async () => {
  if (!selected.value || !props.product || selected.value.stock === 0) return;

  // Initialize cart if not exists
  if (!store.cartId) {
    await store.initializeCart();
  }

  try {
    await store.addToCart({
      cartId: store.cartId,
      productId: props.product.id,
      itemId: selected.value.id,
      qty: 1,
    });

    emit("close");
  } catch (err) {
    console.error("Add to cart failed:", err);
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
