<template>
  <div class="max-w-7xl md:py-10 mx-auto">
    <CartsCart2
      :items="store.cart"
      :totals="totals"

      @remove="remove"
      @updateQty="updateQty"
      @updateSize="updateSize"
      @applyPromo="applyPromo"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@/stores/store";

const store = useStore();

/* -----------------------------
  CALCULATE TOTALS DYNAMICALLY
------------------------------*/
const totals = computed(() => {
  const subtotal = store.cart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return {
    discount: 0,
    shipping: 2,
    tax: 4,
    total: subtotal + 2 + 4,
  };
});

/* -----------------------------
  HANDLE REMOVE
------------------------------*/
const remove = async (item) => {
  await store.deleteCartItem(item.cartItemId);
};

/* -----------------------------
  HANDLE QTY UPDATE
------------------------------*/
const updateQty = async ({ item, type }) => {
  if (type === "inc") {
    await store.incrementItem(item.cartItemId);
  } else if (type === "dec") {
    if (item.qty > 1) {
      await store.decrementItem(item.cartItemId);
    }
  }
};

/* -----------------------------
  UPDATE SIZE (local only)
------------------------------*/
const updateSize = ({ item, size }) => {
  const found = store.cart.find((i) => i.cartItemId === item.cartItemId);
  if (found) found.size = size;
};

/* -----------------------------
  APPLY PROMO
------------------------------*/
const applyPromo = (code) => {
  console.log("Promo code:", code);
};
</script>
<style scoped>
/* Optional component-level CSS */
</style>
