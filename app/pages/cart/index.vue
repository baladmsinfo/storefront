<template>
  <div class="max-w-7xl md:py-10 mx-auto">
    <CartsCart2
      :cart="store.cart"
      @remove="remove"
      @incrementItem="incrementItem"
      @decrementItem="decrementItem"
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
    subtotal: subtotal,
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
  await store.deleteCartItem(item);
};

const incrementItem = async (item) => {
  await store.incrementItem(item);
};

const decrementItem = async (item) => {
    await store.decrementItem(item);
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

