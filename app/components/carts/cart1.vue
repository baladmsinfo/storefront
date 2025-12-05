<template>
  <div class="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2 sm:gap-0">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h2>
      <span class="text-gray-700 font-medium">{{ cartItems.length }} Items</span>
    </div>

    <div class="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 gap-6">
      <!-- Cart Items -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <div
          v-for="(item, index) in cartItems"
          :key="item.id"
          class="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <!-- Image -->
          <div class="flex-shrink-0 w-full sm:w-32">
            <img
              :src="item.image"
              class="w-full h-32 sm:h-32 object-contain rounded-lg"
              alt="Product image"
            />
          </div>

          <!-- Details -->
          <div class="flex flex-col sm:flex-1 gap-2">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <h3 class="text-lg font-semibold text-gray-900">{{ item.name }}</h3>
              <div class="flex gap-2">
                <button @click="removeItem(index)" class="text-red-500 hover:text-red-600 text-sm font-medium">
                  Remove
                </button>
                <button @click="moveToWishlist(item)" class="text-pink-500 hover:text-pink-600 text-sm font-medium">
                  Wishlist
                </button>
              </div>
            </div>

            <p class="text-gray-600 text-sm">Size: <span class="font-medium">{{ item.size }}</span></p>
            <p class="text-gray-600 text-sm">Color: <span class="font-medium">{{ item.color }}</span></p>

            <!-- Quantity & Price -->
            <div class="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div class="flex items-center border rounded-full px-2 sm:px-3 py-1">
                <button @click="decrement(index)" class="text-gray-600 hover:text-gray-900 px-2">-</button>
                <span class="mx-2 text-gray-900 font-medium">{{ item.qty }}</span>
                <button @click="increment(index)" class="text-gray-600 hover:text-gray-900 px-2">+</button>
              </div>
              <div class="text-right">
                <p class="text-gray-900 font-semibold">${{ (item.price * item.qty).toFixed(2) }}</p>
                <p class="text-gray-400 text-sm line-through">${{ item.originalPrice }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:mt-0 flex-shrink-0">
        <div class="bg-white rounded-xl shadow p-6 space-y-6 sticky top-0 lg:top-6">
          <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">Order Summary</h3>
          <ul class="space-y-3 text-gray-700 text-sm">
            <li class="flex justify-between">Subtotal <span class="font-semibold text-gray-900">${{ subtotal.toFixed(2) }}</span></li>
            <li class="flex justify-between">Shipping <span class="font-semibold text-gray-900">$4.00</span></li>
            <li class="flex justify-between">Tax <span class="font-semibold text-gray-900">$4.00</span></li>
            <li class="flex justify-between font-semibold text-gray-900 border-t pt-2">Total <span>${{ total.toFixed(2) }}</span></li>
          </ul>

          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition">
            Proceed to Checkout
          </button>

          <!-- Promo Code -->
          <div>
            <h4 class="text-gray-900 font-semibold mb-2 text-sm sm:text-base">Promo Code</h4>
            <div class="flex flex-col sm:flex-row gap-2">
              <input
                v-model="promoCode"
                type="text"
                placeholder="Enter promo code"
                class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button @click="applyPromo" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';

const cartItems = reactive([
  { id: 1, name: 'Sweater', size: 'MD', color: 'Black', price: 18.5, originalPrice: 22.5, qty: 1, image: 'https://readymadeui.com/images/black-sweaters-1.webp' },
  { id: 2, name: 'Flat Sweater', size: 'LG', color: 'Black', price: 12, originalPrice: 18, qty: 1, image: 'https://readymadeui.com/images/black-sweaters-3.webp' },
  { id: 3, name: 'Lightweight T-Shirt', size: 'XL', color: 'Dark green', price: 14, originalPrice: 20, qty: 1, image: 'https://readymadeui.com/images/dark-green-tshirt-3.webp' },
  { id: 4, name: 'Jacket', size: 'MD', color: 'Green', price: 11.5, originalPrice: 16.5, qty: 1, image: 'https://readymadeui.com/images/green-jacket-3.webp' },
]);

const promoCode = ref('');

const increment = (index) => cartItems[index].qty++;
const decrement = (index) => { if (cartItems[index].qty > 1) cartItems[index].qty--; };
const removeItem = (index) => cartItems.splice(index, 1);
const moveToWishlist = (item) => alert(`${item.name} moved to wishlist!`);
const subtotal = computed(() => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0));
const total = computed(() => subtotal.value + 4 + 4);
const applyPromo = () => alert(`Applied promo: ${promoCode.value}`);
</script>
