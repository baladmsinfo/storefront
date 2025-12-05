<template>
  <div class="max-lg:max-w-2xl mx-auto bg-white p-4">
    <div class="grid lg:grid-cols-3 gap-6">

      <!-- CART ITEMS -->
      <div class="lg:col-span-2 bg-gray-100 p-6 rounded-md">
        <h3 class="text-lg font-semibold text-slate-900">Your Cart</h3>
        <hr class="border-gray-300 mt-4 mb-8" />

        <div v-if="items.length" class="space-y-8">
          <div
            v-for="item in items"
            :key="item.cartItemId"
            class="grid sm:grid-cols-3 items-center gap-4"
          >
            <div class="sm:col-span-2 flex sm:items-center max-sm:flex-col gap-6">

              <!-- IMAGE -->
              <div class="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                <img :src="item.imageUrl" class="w-full h-full object-contain" />
              </div>

              <!-- DETAILS -->
              <div>
                <h4 class="text-[15px] font-semibold text-slate-900">{{ item.name }}</h4>
                <h6
                  @click="$emit('remove', item)"
                  class="text-xs font-medium text-red-500 cursor-pointer mt-1"
                >
                  Remove
                </h6>

                <!-- SIZE + QTY -->
                <div class="flex gap-4 mt-4">

                  <!-- SIZE SELECT -->
                  <div class="relative group">
                    <button
                      class="flex items-center px-2.5 py-1.5 border border-gray-300 text-slate-900 text-xs bg-transparent rounded-md"
                    >
                      {{ item.size || 'XL' }}
                      <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-2.5 fill-gray-500 inline ml-2.5" viewBox="0 0 24 24">
                        <path
                          fill-rule="evenodd"
                          d="M11.99 18.16a2.38 2.38 0 01-1.68-.69l-9.52-9.52a2.38 2.38 0 113.36-3.36l7.83 7.83 7.84-7.84a2.38 2.38 0 113.36 3.36l-9.52 9.52a2.38 2.38 0 01-1.69.7z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    <ul class="group-hover:block hidden absolute rounded-md min-w-[80px] shadow-lg bg-white z-[1000]">
                      <li
                        v-for="size in sizes"
                        :key="size"
                        class="py-2 px-4 hover:bg-gray-100 text-slate-900 text-xs cursor-pointer"
                        @click="$emit('updateSize', { item, size })"
                      >
                        {{ size }}
                      </li>
                    </ul>
                  </div>

                  <!-- QUANTITY -->
                  <div>
                    <div class="flex items-center px-2.5 py-1.5 border border-gray-300 text-slate-900 text-xs rounded-md">

                      <span class="cursor-pointer" @click="$emit('updateQty', { item, type: 'dec' })">
                        ➖
                      </span>

                      <span class="mx-3">{{ item.qty }}</span>

                      <span class="cursor-pointer" @click="$emit('updateQty', { item, type: 'inc' })">
                        ➕
                      </span>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PRICE -->
            <div class="sm:ml-auto">
              <h4 class="text-[15px] font-semibold text-slate-900">
                ₹{{ item.price }}
              </h4>
            </div>

          </div>
        </div>

        <div v-else class="text-center py-10 text-slate-600 font-medium">
          Your cart is empty 🛒
        </div>
      </div>

      <!-- ORDER SUMMARY -->
      <div class="bg-gray-100 rounded-md p-6 md:sticky top-0 h-max">
        <h3 class="text-lg font-semibold text-slate-900">Order details</h3>
        <hr class="border-gray-300 mt-4 mb-8" />

        <ul class="text-slate-500 font-medium mt-8 space-y-4">
          <li class="flex flex-wrap gap-4 text-sm">
            Discount <span class="ml-auto text-slate-900 font-semibold">₹{{ totals.discount }}</span>
          </li>
          <li class="flex flex-wrap gap-4 text-sm">
            Shipping <span class="ml-auto text-slate-900 font-semibold">₹{{ totals.shipping }}</span>
          </li>
          <li class="flex flex-wrap gap-4 text-sm">
            Tax <span class="ml-auto text-slate-900 font-semibold">₹{{ totals.tax }}</span>
          </li>
          <li class="flex flex-wrap gap-4 text-sm text-slate-900">
            Total <span class="ml-auto font-semibold">₹{{ totals.total }}</span>
          </li>
        </ul>

        <div class="mt-8 space-y-3">
          <button class="text-sm px-4 py-2.5 w-full font-medium bg-blue-600 text-white rounded-md">
            Checkout
          </button>

          <button class="text-sm px-4 py-2.5 w-full font-medium border border-gray-300 rounded-md">
            Continue Shopping
          </button>
        </div>

        <!-- PROMO -->
        <div class="mt-6">
          <p class="text-slate-900 text-sm font-medium mb-2">
            Do you have a promo code?
          </p>

          <div class="flex border border-blue-600 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Promo code"
              class="w-full outline-0 bg-white text-slate-600 text-sm px-4 py-2.5"
              v-model="promo"
            />

            <button
              @click="$emit('applyPromo', promo)"
              class="bg-blue-600 px-4 text-sm text-white"
            >
              Apply
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  items: { type: Array, required: true },
  totals: { type: Object, required: true }
});

defineEmits(["remove", "updateQty", "updateSize", "applyPromo"]);

const promo = ref("");
const sizes = ["SM", "MD", "XL", "XXL"];
</script>
