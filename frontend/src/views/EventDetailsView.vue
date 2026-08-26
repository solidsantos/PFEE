<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useEventStore } from '../stores/event';
import { useRegistrationStore } from '../stores/registration';

import type { Event } from '../types/event';

const route = useRoute();
const router = useRouter();

const eventStore = useEventStore();
const registrationStore = useRegistrationStore();

const event = ref<Event | null>(null);

const loading = ref(true);
const registering = ref(false);

const error = ref('');
const success = ref('');

const eventId = computed(() =>
  Number(route.params.id)
);

const isRegistered = computed(() =>
  registrationStore.isRegistered(
    eventId.value
  )
);

onMounted(async () => {
  try {
    event.value =
      await eventStore.fetchEventById(
        eventId.value
      );

    await registrationStore.fetchMyEvents();
  } catch (err: any) {
    console.error(err);

    error.value =
      err.response?.data?.message ||
      'Não foi possível carregar o evento.';
  } finally {
    loading.value = false;
  }
});

async function register() {
  if (!event.value) {
    return;
  }

  registering.value = true;
  error.value = '';
  success.value = '';

  try {
    await registrationStore.register(
      event.value.id
    );

    success.value =
      'Inscrição realizada com sucesso!';
  } catch (err: any) {
    console.error(err);

    error.value =
      err.response?.data?.message ||
      'Não foi possível realizar a inscrição.';
  } finally {
    registering.value = false;
  }
}

async function cancelRegistration() {
  if (!event.value) {
    return;
  }

  registering.value = true;
  error.value = '';
  success.value = '';

  try {
    await registrationStore.cancelRegistration(
      event.value.id
    );

    success.value =
      'Inscrição cancelada com sucesso!';
  } catch (err: any) {
    console.error(err);

    error.value =
      err.response?.data?.message ||
      'Não foi possível cancelar a inscrição.';
  } finally {
    registering.value = false;
  }
}

function goBack() {
  router.push('/');
}
</script>

<template>
  <main class="page">
    <div class="container event-details-container">

      <!-- Voltar -->
      <button
        type="button"
        class="btn btn-secondary back-button"
        @click="goBack"
      >
        ← Voltar
      </button>

      <!-- Loading -->
      <div
        v-if="loading"
        class="state-card card"
      >
        <div class="loading-spinner"></div>

        <p>
          Carregando evento...
        </p>
      </div>

      <!-- Erro ao carregar -->
      <div
        v-else-if="error && !event"
        class="state-card state-error card"
      >
        <h3>
          Não foi possível carregar o evento
        </h3>

        <p>
          {{ error }}
        </p>

        <button
          type="button"
          class="btn btn-primary"
          @click="goBack"
        >
          Voltar para eventos
        </button>
      </div>

      <!-- Evento -->
      <section
        v-else-if="event"
        class="event-details-card card"
      >
        <!-- Cabeçalho -->
        <header class="event-details-header">
          <span class="event-category">
            {{ event.category }}
          </span>

          <h1>
            {{ event.title }}
          </h1>

          <p class="event-description">
            {{ event.description }}
          </p>
        </header>

        <!-- Informações -->
        <div class="event-info-grid">

          <div class="event-info">
            <span class="event-info-label">
              DATA
            </span>

            <strong>
              {{ event.date }}
            </strong>
          </div>

          <div class="event-info">
            <span class="event-info-label">
              HORÁRIO
            </span>

            <strong>
              {{ event.time }}
            </strong>
          </div>

          <div class="event-info">
            <span class="event-info-label">
              LOCAL
            </span>

            <strong>
              {{ event.location }}
            </strong>
          </div>

          <div class="event-info">
            <span class="event-info-label">
              ORGANIZADOR
            </span>

            <strong>
              {{ event.organizer }}
            </strong>
          </div>

          <div class="event-info">
            <span class="event-info-label">
              VAGAS
            </span>

            <strong>
              {{ event.capacity }}
            </strong>
          </div>

        </div>

        <!-- Mensagem de sucesso -->
        <div
          v-if="success"
          class="event-message event-message-success"
        >
          {{ success }}
        </div>

        <!-- Mensagem de erro -->
        <div
          v-if="error"
          class="event-message event-message-error"
        >
          {{ error }}
        </div>

        <!-- Ação -->
        <footer class="event-details-actions">

          <button
            v-if="!isRegistered"
            type="button"
            class="btn btn-primary event-action-button"
            :disabled="registering"
            @click="register"
          >
            {{
              registering
                ? 'Inscrevendo...'
                : 'Inscrever-se'
            }}
          </button>

          <button
            v-else
            type="button"
            class="btn btn-danger event-action-button"
            :disabled="registering"
            @click="cancelRegistration"
          >
            {{
              registering
                ? 'Cancelando...'
                : 'Cancelar inscrição'
            }}
          </button>

        </footer>
      </section>

    </div>
  </main>
</template>