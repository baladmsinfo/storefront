<template>
  <section
    class="w-full bg-gradient-to-b from-white via-gray-50 border-gray-200 mb-2"
  >
    <div
      class="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      <!-- TEXT AREA -->
      <div class="space-y-6">
        <h1
          class="text-3xl sm:text-5xl font-extrabold leading-tight text-gray-900 tracking-wide"
        >
          Discover  
          <span class="bg-gradient-to-r from-gray-700 to-gray-400 bg-clip-text text-transparent">
            Premium Elegance
          </span>
        </h1>

        <p class="text-gray-600 text-lg max-w-md leading-relaxed">
          Explore exclusive collections crafted with precision, style, and
          luxury—made for a modern lifestyle.
        </p>

        <button
          class="px-8 py-3.5 bg-black text-white rounded-xl font-medium shadow-lg 
                 hover:bg-gray-900 active:scale-95 transition"
        >
          Shop Now
        </button>
      </div>

      <!-- IMAGE AREA WITH WHITE GRADIENT -->
      <div class="flex justify-center">
        <div
          class="relative w-full max-w-md h-[260px] sm:h-[340px] md:h-[420px]
                 bg-gradient-to-b from-white/90 via-gray-100/70 to-white/20
                 rounded-2xl flex items-center justify-center overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
            alt="Premium Product"
            class="max-w-full max-h-full object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  </section>
</template>
