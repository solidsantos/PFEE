<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue';

import { useEventStore } from '../stores/event';
import type { Event } from '../types/event';

const props = defineProps<{
  event?: Event | null;
}>();

const emit = defineEmits<{
  saved: [];
  cancel: [];
}>();

const eventStore = useEventStore();

const title = ref('');
const description = ref('');
const date = ref('');
const time = ref('');
const location = ref('');
const category = ref('');
const organizer = ref('');
const capacity = ref(1);
const error = ref('');

const isEditing = computed(
  () => !!props.event
);

function loadEvent() {
  if (props.event) {
    title.value = props.event.title;
    description.value = props.event.description;
    date.value = props.event.date;
    time.value = props.event.time;
    location.value = props.event.location;
    category.value = props.event.category;
    organizer.value = props.event.organizer;
    capacity.value = props.event.capacity;
  } else {
    title.value = '';
    description.value = '';
    date.value = '';
    time.value = '';
    location.value = '';
    category.value = '';
    organizer.value = '';
    capacity.value = 1;
  }
}

watch(
  () => props.event,
  () => {
    loadEvent();
    error.value = '';
  },
  {
    immediate: true,
  }
);

async function handleSubmit() {
  error.value = '';

  if (
    !title.value ||
    !description.value ||
    !date.value ||
    !time.value ||
    !location.value ||
    !category.value ||
    !organizer.value ||
    !capacity.value
  ) {
    error.value =
      'Todos os campos são obrigatórios.';
    return;
  }

  if (capacity.value <= 0) {
    error.value =
      'A capacidade deve ser maior que zero.';
    return;
  }

  const eventData = {
    title: title.value,
    description: description.value,
    date: date.value,
    time: time.value,
    location: location.value,
    category: category.value,
    organizer: organizer.value,
    capacity: Number(capacity.value),
  };

  try {
    if (props.event) {
      await eventStore.updateEvent(
        props.event.id,
        eventData
      );
    } else {
      await eventStore.createEvent(
        eventData
      );
    }

    emit('saved');
  } catch (err: any) {
    console.error(err);

    error.value =
      err.response?.data?.message ||
      eventStore.error ||
      'Não foi possível salvar o evento.';
  }
}

function handleCancel() {
  emit('cancel');
}
</script>

<template>
  <form
    class="event-form"
    @submit.prevent="handleSubmit"
  >
    <!-- Cabeçalho -->
    <div class="event-form-header">
      <div>
        <span class="section-label">
          {{ isEditing ? 'EDIÇÃO' : 'CADASTRO' }}
        </span>

        <h2>
          {{
            isEditing
              ? 'Editar evento'
              : 'Novo evento'
          }}
        </h2>

        <p>
          {{
            isEditing
              ? 'Atualize as informações do evento.'
              : 'Preencha as informações para criar um novo evento.'
          }}
        </p>
      </div>
    </div>

    <!-- Campos -->
    <div class="event-form-grid">

      <!-- Nome -->
      <div class="form-group form-group-full">
        <label for="title">
          Nome do evento
        </label>

        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="Nome do evento"
        />
      </div>

      <!-- Descrição -->
      <div class="form-group form-group-full">
        <label for="description">
          Descrição
        </label>

        <textarea
          id="description"
          v-model="description"
          rows="5"
          placeholder="Descreva o evento..."
        ></textarea>
      </div>

      <!-- Data -->
      <div class="form-group">
        <label for="date">
          Data
        </label>

        <input
          id="date"
          v-model="date"
          type="date"
        />
      </div>

      <!-- Horário -->
      <div class="form-group">
        <label for="time">
          Horário
        </label>

        <input
          id="time"
          v-model="time"
          type="time"
        />
      </div>

      <!-- Local -->
      <div class="form-group">
        <label for="location">
          Local
        </label>

        <input
          id="location"
          v-model="location"
          type="text"
          placeholder="Fortaleza, CE"
        />
      </div>

      <!-- Categoria -->
      <div class="form-group">
        <label for="category">
          Categoria
        </label>

        <input
          id="category"
          v-model="category"
          type="text"
          placeholder="Tecnologia"
        />
      </div>

      <!-- Organizador -->
      <div class="form-group">
        <label for="organizer">
          Organizador
        </label>

        <input
          id="organizer"
          v-model="organizer"
          type="text"
          placeholder="UFC"
        />
      </div>

      <!-- Capacidade -->
      <div class="form-group">
        <label for="capacity">
          Capacidade
        </label>

        <input
          id="capacity"
          v-model.number="capacity"
          type="number"
          min="1"
          placeholder="100"
        />
      </div>

    </div>

    <!-- Mensagens -->
    <div
      v-if="error"
      class="form-message form-message-error"
    >
      {{ error }}
    </div>

    <div
      v-if="eventStore.loading"
      class="form-message form-message-loading"
    >
      Salvando evento...
    </div>

    <!-- Ações -->
    <div class="event-form-actions">

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="eventStore.loading"
      >
        {{
          eventStore.loading
            ? 'Salvando...'
            : 'Salvar evento'
        }}
      </button>

      <button
        type="button"
        class="btn btn-secondary"
        :disabled="eventStore.loading"
        @click="handleCancel"
      >
        Cancelar
      </button>

    </div>
  </form>
</template>