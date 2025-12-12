<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <section class="py-3 bg-[#1d294f] text-white text-center px-10">
      <p class="text-sm">
        Summer Sale: Save up to 40% on select items. Limited-time offer!
      </p>
    </section>

    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
      <!-- Left: Logo -->
      <a href="/" class="flex items-center gap-2 select-none">

        <!-- Desktop: Long logo or full company name -->
        <div class="max-sm:hidden flex items-center">
          <img v-if="tenant?.value?.data?.logoUrlLong" :src="tenant.value.data.logoUrlLong" class="w-36"
            alt="Company Logo" />

          <!-- Stylish desktop name -->
          <span v-else class="text-sm font-semibold tracking-wide" style="font-family: 'Cinzel Decorative', serif;">
            {{ shortName }}
          </span>
        </div>

        <!-- Mobile: Short logo or short company name -->
        <div class="sm:hidden flex items-center">
          <img v-if="tenant?.value?.data?.logoUrlShort" :src="tenant.value.data.logoUrlShort" class="w-8"
            alt="Company Logo Short" />

          <!-- Stylish mobile name -->
          <span v-else class="text-sm font-bold tracking-wide" style="font-family: 'Cinzel Decorative', serif;">
            {{ shortName }}
          </span>
        </div>

      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-6 text-[15px] font-medium">
        <div class="relative">
          <button @mouseenter="megaOpen = true" @mouseleave="megaOpen = false"
            class="hover:text-black text-gray-700 flex items-center gap-1 transition">
            Products
            <span>▾</span>
          </button>

          <!-- Desktop Mega Menu -->
          <transition name="fade">
            <div v-if="megaOpen" @mouseenter="megaOpen = true" @mouseleave="megaOpen = false"
              class="absolute left-1/2 -translate-x-1/2 top-12 bg-white shadow-xl rounded-xl p-8 w-[950px] border border-gray-100 max-h-[600px] overflow-y-auto">
              <div class="grid grid-cols-4 gap-8">
                <div v-for="category in categories" :key="category.id">
                  <h4 class="font-semibold text-gray-900 mb-4">
                    {{ category.name }}
                  </h4>
                  <ul class="space-y-3">
                    <li v-for="child in category.children" :key="child.id"
                      class="text-gray-600 hover:text-black cursor-pointer text-sm transition">
                      {{ child.name }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Banner -->
              <div class="mt-6 w-full h-32 rounded-lg overflow-hidden shadow">
                <img src="https://readymadeui.com/images/digital-img-5.webp" class="w-full h-full object-cover" />
              </div>
            </div>
          </transition>
        </div>

        <a href="#" class="text-gray-600 hover:text-black transition">Offers</a>
        <a href="#" class="text-gray-600 hover:text-black transition">Women</a>
        <a href="#" class="text-gray-600 hover:text-black transition">Blog</a>
      </nav>

      <!-- Right: Buttons -->
      <div class="flex items-center gap-4">
        <!-- Cart Button -->
        <button @click="cartOpen = !cartOpen" class="relative">
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21h4" />
          </svg>
          <span v-if="cart.items?.length"
            class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {{ cart.items.length }}
          </span>
        </button>

        <!-- Desktop CTA -->
        <button
          class="hidden lg:block bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-900 transition">
          Login
        </button>

        <!-- Mobile Menu Toggle -->
        <button class="lg:hidden" @click="toggleMenu">
          <svg class="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- MOBILE SLIDE-IN MENU -->
    <transition name="slide">
      <div v-if="menuOpen" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex" @click.self="toggleMenu">
        <div class="w-72 bg-white h-full shadow-xl p-6 overflow-y-auto">
          <!-- Mobile Header -->
          <div class="flex items-center justify-between">
            <img src="https://readymadeui.com/readymadeui.svg" class="w-32" />
            <button @click="toggleMenu">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
                <path fill="black"
                  d="M18.3 5.71L12 12l6.3 6.29-1.42 1.42L12 13.41l-6.29 6.3-1.42-1.42L10.59 12 4.29 5.71 5.71 4.29 12 10.59l6.29-6.3z" />
              </svg>
            </button>
          </div>

          <!-- Mobile Menu Items -->
          <div class="mt-8 space-y-6">
            <div>
              <button @click="mobileMegaOpen = !mobileMegaOpen"
                class="w-full flex justify-between items-center py-3 border-b font-medium text-gray-700">
                Products
                <span>{{ mobileMegaOpen ? "▴" : "▾" }}</span>
              </button>

              <transition name="expand">
                <div v-if="mobileMegaOpen" class="pl-3 py-2 space-y-4">
                  <div v-for="category in categories" :key="category.id">
                    <h4 class="font-semibold text-gray-900 mb-2">
                      {{ category.name }}
                    </h4>
                    <ul class="space-y-2 border-l pl-4">
                      <li v-for="child in category.children" :key="child.id"
                        class="text-gray-600 hover:text-black text-sm">
                        {{ child.name }}
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </div>

            <a class="block text-gray-700 text-[15px] font-medium border-b pb-3">Offers</a>
            <a class="block text-gray-700 text-[15px] font-medium border-b pb-3">Women</a>
            <a class="block text-gray-700 text-[15px] font-medium border-b pb-3">Blog</a>

            <button class="w-full bg-black text-white py-3 rounded-full font-medium mt-6 hover:bg-gray-900 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide">
      <div v-if="cartOpen" class="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex justify-end"
        @click.self="cartOpen = false">
        <!-- Cart Slider -->
        <div class="flex h-full w-80 md:w-96 flex-col overflow-y-auto bg-white rounded-l-xl shadow-2xl">
          <!-- Cart Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Shopping Cart</h2>
            <button @click="cartOpen = false" class="p-2 rounded-full hover:bg-gray-100 transition">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Cart Items -->
          <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div v-if="!cart.items?.length" class="text-center text-gray-400 py-20">
              Your cart is empty
            </div>

            <ul role="list" class="space-y-4">
              <li v-for="item in cart.items" :key="item.cartItemId"
                class="flex items-center gap-4 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <div class="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-200">
                  <img :src="item.product?.imageUrl ||
                    'https://via.placeholder.com/150?text=No+Image'
                    " @error="
                      (e) =>
                      (e.currentTarget.src =
                        'https://via.placeholder.com/150?text=No+Image')
                    " alt="Product Image" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div class="flex justify-between font-medium text-gray-900">
                      <h3>
                        <a href="#">{{ item.product?.name }}</a>
                      </h3>
                      <p>₹{{ item.price }}</p>
                    </div>
                    <p class="text-sm text-gray-500">
                      {{ item.variant || "Default" }}
                    </p>
                  </div>
                  <div class="flex justify-between items-center mt-2 text-sm">
                    <div class="flex gap-2">
                      <button @click="decrementItem(item.id)"
                        class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                        -
                      </button>
                      <p class="text-gray-500 mt-1"> {{ item.quantity }}</p>
                      <button @click="incrementItem(item.id)"
                        class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                        +
                      </button>
                      <button @click="deleteCartItem(item.id)"
                        class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Cart Footer -->
          <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div class="flex justify-between font-medium text-gray-900 text-lg">
              <span>Subtotal</span>
              <span>₹{{ cart.total }}</span>
            </div>
            <p class="mt-1 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>

            <button @click="checkoutCart"
              class="w-full mt-4 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition">
              Checkout
            </button>

            <button @click="shopping"
              class="w-full mt-2 py-3 text-indigo-600 font-medium rounded-lg border border-indigo-600 hover:bg-indigo-50 transition">
              Continue Shopping &rarr;
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "@/stores/store";
import { useRouter } from "vue-router";
import { useTenant } from "~/composables/useTenant";

const { tenant } = useTenant();

const shortName = computed(() => {
  const name = tenant?.value?.data?.name || "";
  return name.split(" ")[0]; // text before first space
});

const fullName = computed(() => {
  return tenant?.value?.data?.name || "";
});

watchEffect(() => {
  if (tenant.value.tenant != "default") {
    console.log("tenant", tenant.value);
  }
});

const router = useRouter()

const store = useStore();
const menuOpen = ref(false);
const megaOpen = ref(false);
const mobileMegaOpen = ref(false);
const cartOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const cart = computed(() => store.cart);
const cartTotal = computed(() =>
  store.cart.reduce((sum, item) => sum + item.total, 0)
);

const incrementItem = (id: string) => store.incrementItem(id);
const decrementItem = (id: string) => store.decrementItem(id);
const deleteCartItem = (id: string) => store.deleteCartItem(id);
const checkoutCart = async () => {
  cartOpen.value = false;
  await nextTick()                  // wait for UI close animation

  router.push('/cart')              // navigate to cart page
};
const shopping = async () => {
  cartOpen.value = false;
  router.push('/')              // navigate to cart page
};

// Fetch categories + initialize cart
onMounted(async () => {
  await store.fetchCategory();
  await store.initializeCart();
});

// Use categories from store
const categories = computed(() => store.categories);
</script>

<style scoped>
/* Fade animation for mega menu */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile slide-in animation */
.slide-enter-active {
  animation: slide-in 0.3s forwards ease-out;
}

.slide-leave-active {
  animation: slide-out 0.3s forwards ease-in;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
}

/* Expand animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
