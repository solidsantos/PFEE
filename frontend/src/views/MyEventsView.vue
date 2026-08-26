<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import EventList from '../components/EventList.vue';
import { useRegistrationStore } from '../stores/registration';

const router = useRouter();
const registrationStore = useRegistrationStore();

onMounted(() => {
  registrationStore.fetchMyEvents();
});

function goBack() {
  router.push('/');
}
</script>

<template>
  <main class="page">
    <div class="container">
      <!-- Cabeçalho -->
      <header class="my-events-header card">
        <div>
          <span class="section-label">
            MINHA AGENDA
          </span>

          <h1>Meus eventos</h1>

          <p>
            Confira os eventos nos quais você está inscrito.
          </p>
        </div>

        <button
          type="button"
          class="btn btn-secondary"
          @click="goBack"
        >
          ← Voltar
        </button>
      </header>

      <!-- Conteúdo -->
      <section class="my-events-section">
        <!-- Loading -->
        <div
          v-if="registrationStore.loading"
          class="state-card card"
        >
          <div class="loading-spinner"></div>

          <p>
            Carregando seus eventos...
          </p>
        </div>

        <!-- Erro -->
        <div
          v-else-if="registrationStore.error"
          class="state-card state-error card"
        >
          <h3>
            Não foi possível carregar seus eventos
          </h3>

          <p>
            {{ registrationStore.error }}
          </p>

          <button
            type="button"
            class="btn btn-primary"
            @click="registrationStore.fetchMyEvents()"
          >
            Tentar novamente
          </button>
        </div>

        <!-- Nenhum evento -->
        <div
          v-else-if="!registrationStore.hasRegistrations"
          class="state-card card"
        >
          <div class="empty-icon">
            📅
          </div>

          <h3>
            Você ainda não está inscrito em nenhum evento.
          </h3>

          <p>
            Encontre um evento na página inicial e faça sua inscrição.
          </p>

          <button
            type="button"
            class="btn btn-primary"
            @click="goBack"
          >
            Encontrar eventos
          </button>
        </div>

        <!-- Eventos -->
        <div v-else>
          <div class="events-heading">
            <div>
              <span class="section-label">
                INSCRIÇÕES
              </span>

              <h2>
                Seus eventos
              </h2>
            </div>

            <span class="event-count">
              {{ registrationStore.myEvents.length }}
              {{
                registrationStore.myEvents.length === 1
                  ? 'evento'
                  : 'eventos'
              }}
            </span>
          </div>

          <EventList
            :events="registrationStore.myEvents"
          />
        </div>
      </section>
    </div>
  </main>
</template>