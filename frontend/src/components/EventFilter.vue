<script setup lang="ts">
import { ref } from 'vue';

import type { EventFilters } from '../types/event';

const emit = defineEmits<{
  filter: [filters: EventFilters];
}>();

const category = ref('');
const date = ref('');
const location = ref('');

function applyFilters() {
  emit('filter', {
    category: category.value || undefined,
    date: date.value || undefined,
    location: location.value || undefined,
  });
}

function clearFilters() {
  category.value = '';
  date.value = '';
  location.value = '';

  emit('filter', {});
}
</script>

<template>
  <div class="event-filter">

    <select v-model="category">
      <option value="">
        Todas as categorias
      </option>

      <option value="Tecnologia">
        Tecnologia
      </option>

      <option value="Acadêmico">
        Acadêmico
      </option>

      <option value="Workshop">
        Workshop
      </option>

      <option value="Palestra">
        Palestra
      </option>

      <option value="Cultura">
        Cultura
      </option>

      <option value="Esportes">
        Esportes
      </option>

      <option value="Educação">
        Educação
      </option>

      <option value="Negócios">
        Negócios
      </option>

      <option value="Saúde">
        Saúde
      </option>
    </select>

    <input
      v-model="date"
      type="date"
    />

    <input
      v-model="location"
      type="text"
      placeholder="Local"
    />

    <button
      type="button"
      class="btn btn-primary"
      @click="applyFilters"
    >
      Filtrar
    </button>

    <button
      type="button"
      class="btn btn-secondary"
      @click="clearFilters"
    >
      Limpar
    </button>

  </div>
</template>