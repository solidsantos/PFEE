<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  search: [search: string];
}>();

const search = ref('');

function handleSearch() {
  emit('search', search.value);
}
</script>

<template>
  <div class="search-bar">
    <input
      v-model="search"
      type="text"
      placeholder="Pesquisar eventos..."
      @keyup.enter="handleSearch"
    />

    <button
      type="button"
      class="btn btn-primary"
      @click="handleSearch"
    >
      Pesquisar
    </button>
  </div>
</template>