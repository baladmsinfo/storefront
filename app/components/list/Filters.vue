<template>
  <div class="bg-white rounded-xl shadow p-4 space-y-4">

    <h3 class="text-lg font-semibold text-gray-900">Filters</h3>

    <Collapsible v-for="cat in categories" :key="cat.id">
      <template #title>
        <span class="text-gray-800 text-base font-medium">{{ cat.name }}</span>
      </template>

      <div class="space-y-2 pl-1">
        <div
          v-for="sub in cat.subcategories"
          :key="sub.id"
          class="flex items-center gap-2"
        >
          <input
            type="checkbox"
            :value="sub.name"
            v-model="selected"
            class="w-4 h-4 accent-blue-600"
          />
          <label class="text-gray-700 text-sm">{{ sub.name }}</label>
        </div>
      </div>
    </Collapsible>

    <button
      @click="applyFilters"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium mt-2"
    >
      Apply Filters
    </button>
  </div>
</template>

<script setup>
import Collapsible from "./Collapsible.vue";
import { ref } from "vue";

const emit = defineEmits(["apply"]);

const selected = ref([]);

const categories = [
  {
    id: 1,
    name: "Clothing",
    subcategories: [
      { id: 11, name: "T-Shirts" },
      { id: 12, name: "Sweaters" },
      { id: 13, name: "Jackets" },
    ],
  },
  {
    id: 2,
    name: "Shoes",
    subcategories: [
      { id: 21, name: "Casual" },
      { id: 22, name: "Running" },
      { id: 23, name: "Sneakers" },
    ],
  },
  {
    id: 3,
    name: "Accessories",
    subcategories: [
      { id: 31, name: "Bags" },
      { id: 32, name: "Caps" },
      { id: 33, name: "Belts" },
    ],
  },
];

const applyFilters = () => {
  emit("apply", selected.value);
};
</script>
