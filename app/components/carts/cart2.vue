<template>
  <div class="bg-white sm:px-8 px-4 py-6">
    <div class="max-w-screen-xl max-lg:max-w-xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12">

        <!-- CART ITEMS -->
        <div class="relative">
          <div class="md:overflow-auto">
            <div v-for="item in cart.items" :key="item.id" class="space-y-4">
              <div class="flex gap-4 max-sm:flex-col">
                <div class="w-24 h-24 shrink-0 bg-purple-50 p-2 rounded-md">
                  <img :src="item.product.imageUrl || 'https://readymadeui.com/images/product14.webp'" class="w-full h-full object-contain" />
                </div>

                <div class="w-full flex justify-between gap-4">
                  <div>
                    <h3 class="text-sm font-medium text-slate-900">{{ item.product.name }}</h3>
                    <p class="text-sm font-medium text-slate-500 mt-2">{{ item.size || 'Default Size' }}</p>
                    <h6 class="text-[15px] text-slate-900 font-medium mt-4">${{ item.price.toFixed(2) }}</h6>
                  </div>

                  <!-- REMOVE + QUANTITY -->
                  <div class="flex flex-col justify-between items-end gap-4">
                    <div>
                      <svg @click="$emit('remove', item.id)" xmlns="http://www.w3.org/2000/svg" class="w-4 fill-red-500 inline cursor-pointer" viewBox="0 0 24 24">
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                      </svg>
                    </div>

                    <div class="flex items-center px-2.5 py-1.5 border border-gray-400 text-slate-900 text-xs font-medium outline-0 bg-transparent rounded-md">
                      <button @click="$emit('decrementItem', item.id)" type="button" class="cursor-pointer border-0 outline-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 fill-current" viewBox="0 0 124 124">
                          <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"></path>
                        </svg>
                      </button>

                      <span class="mx-3">{{ item.quantity }}</span>

                      <button @click="$emit('incrementItem', item.id)" type="button" class="cursor-pointer border-0 outline-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 fill-current" viewBox="0 0 42 42">
                          <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <hr class="border-gray-300" />
            </div>

            <!-- TOTALS -->
            <hr class="border-gray-300 my-6" />
            <div>
              <ul class="text-slate-500 font-medium space-y-4">
                <li class="flex justify-between text-sm">Subtotal <span class="font-semibold text-slate-900">${{ cart.subtotal }}</span></li>
                <li class="flex justify-between text-sm">Shipping <span class="font-semibold text-slate-900">${{ cart.shipping}}</span></li>
                <li class="flex justify-between text-sm">Tax <span class="font-semibold text-slate-900">${{ cart.tax }}</span></li>
                <hr class="border-slate-300" />
                <li class="flex justify-between font-semibold text-[15px]">Total <span>${{ cart.total }}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- DELIVERY + PAYMENT FORM -->
        <div class="max-w-4xl w-full h-max rounded-md">
          <form @submit.prevent="checkout">
            <div>
              <h2 class="text-xl text-slate-900 font-semibold mb-6">Delivery Details</h2>
              <div class="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">First Name</label>
                  <input v-model="form.firstName" type="text" placeholder="Enter First Name" class="input-field" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Last Name</label>
                  <input v-model="form.lastName" type="text" placeholder="Enter Last Name" class="input-field" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Email</label>
                  <input v-model="form.email" type="email" placeholder="Enter Email" class="input-field" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Phone No.</label>
                  <input v-model="form.phone" type="number" placeholder="Enter Phone No." class="input-field" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Address Line</label>
                  <input v-model="form.address" type="text" placeholder="Enter Address Line" class="input-field" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">City</label>
                  <input v-model="form.city" type="text" placeholder="Enter City" class="input-field" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">State</label>
                  <input v-model="form.state" type="text" placeholder="Enter State" class="input-field" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Zip Code</label>
                  <input v-model="form.zip" type="text" placeholder="Enter Zip Code" class="input-field" />
                </div>
              </div>
            </div>

            <div class="mt-10">
              <h2 class="text-xl text-slate-900 font-semibold mb-6">Payment</h2>
              <div class="flex gap-4 max-lg:flex-col mt-8">
                <button type="button" class="btn-gray" @click="$emit('continueShopping')">Continue Shopping</button>
                <button type="submit" class="btn-blue">Make payment</button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";

defineProps({
  cart: { type: Object, required: true }
});

defineEmits(["remove", "incrementItem", "decrementItem", "continueShopping"]);

// Delivery form reactive object
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: ""
});


// MOCK CHECKOUT
const checkout = () => {
  console.log("Checkout data:", form, cart);
  alert("Checkout complete!");
};
</script>

<style scoped>
@reference "@/assets/css/tailwind.css";

.input-field {
  @apply px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600;
}

.btn-gray {
  @apply rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-gray-200 hover:bg-gray-300 border border-gray-300 text-slate-900 cursor-pointer;
}

.btn-blue {
  @apply rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer;
}
</style>