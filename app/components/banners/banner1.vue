<template>
  <section
    class="relative w-full h-[340px] sm:h-[420px] md:h-[480px] overflow-hidden shadow-xl group"
  >
    <!-- Background Image -->
    <img
      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
      class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      alt="Hero Banner"
    />

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

    <!-- Text Section -->
    <div
      class="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-16 text-white max-w-xl"
    >
      <h1
        class="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight drop-shadow-lg"
      >
        Discover Premium Products
      </h1>

      <p
        class="text-sm sm:text-lg md:text-xl opacity-90 mb-6 drop-shadow"
      >
        Shop the latest trends with unbeatable prices.
      </p>

      <button
        class="px-5 sm:px-7 py-2.5 sm:py-3 bg-white text-black font-semibold rounded-xl shadow-md 
               hover:bg-gray-200 active:scale-95 transition-all duration-300"
      >
        Shop Now
      </button>
    </div>
  </section>
</template>
