<template>
  <div class="w-full">
    <button
      class="w-full flex justify-between items-center py-3 text-left font-medium text-gray-900"
      @click="toggle"
    >
      <slot name="title" />
      <svg
        :class="[open ? 'rotate-180' : 'rotate-0', 'w-5 h-5 transition-transform']"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      ref="content"
      class="overflow-hidden transition-all duration-300"
      :style="{ height: open ? contentHeight + 'px' : '0px' }"
    >
      <div class="pb-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const open = ref(false);
const content = ref(null);
const contentHeight = ref(0);

const toggle = async () => {
  open.value = !open.value;
  await nextTick();

  contentHeight.value = content.value.scrollHeight;
};
</script>
