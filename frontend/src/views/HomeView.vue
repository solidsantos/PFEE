<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import EventList from '../components/EventList.vue';
import EventFilter from '../components/EventFilter.vue';
import SearchBar from '../components/SearchBar.vue';

import { useAuthStore } from '../stores/auth';
import { useEventStore } from '../stores/event';

import type { EventFilters } from '../types/event';

const authStore = useAuthStore();
const eventStore = useEventStore();
const router = useRouter();

onMounted(() => {
  eventStore.fetchEvents();
});

function searchEvents(search: string) {
  eventStore.fetchEvents({
    search,
  });
}

function filterEvents(filters: EventFilters) {
  eventStore.fetchEvents(filters);
}

function logout() {
  authStore.logout();
  router.push('/login');
}
</script>

<template>
  <main class="page">
    <div class="container">

      <!-- Header -->
      <header class="home-header card">
        <div class="home-brand">
          <span class="home-brand-icon">E</span>

          <div>
            <h1>Sistema de Gestão de Eventos</h1>

            <p>
              Projeto Final do curso de Pós Graduação de Desenvolvimento Full Stack da Faculdade Estácio (2026.2).
            </p>
          </div>
        </div>

        <div
          v-if="authStore.user"
          class="home-user"
        >
          <span class="home-welcome">
            Olá,
            <strong>{{ authStore.user.name }}</strong>
          </span>

          <nav class="home-navigation">
            <RouterLink
              class="nav-link"
              to="/my"
            >
              Meus eventos
            </RouterLink>

            <RouterLink
              v-if="authStore.isAdmin"
              class="nav-link nav-link-admin"
              to="/admin/events"
            >
              Gerenciar eventos
            </RouterLink>

            <button
              type="button"
              class="btn btn-secondary"
              @click="logout"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      <!-- Busca e filtros -->
      <section class="search-section card">
        <div class="section-heading">
          <span class="section-label">
            EVENTOS
          </span>

          <h2>Encontre um evento</h2>

          <p>
            Pesquise por eventos ou utilize os filtros
            para encontrar exatamente o que procura.
          </p>
        </div>

        <div class="search-controls">
          <SearchBar
            @search="searchEvents"
          />

          <EventFilter
            @filter="filterEvents"
          />
        </div>
      </section>

      <!-- Lista de eventos -->
      <section class="events-section">

        <div class="events-heading">
          <div>
            <span class="section-label">
              DISPONÍVEIS
            </span>

            <h2>Eventos disponíveis</h2>
          </div>

          <span
            v-if="eventStore.hasEvents"
            class="event-count"
          >
            {{ eventStore.events.length }}

            {{
              eventStore.events.length === 1
                ? 'evento'
                : 'eventos'
            }}
          </span>
        </div>

        <!-- Loading -->
        <div
          v-if="eventStore.loading"
          class="state-card card"
        >
          <div class="loading-spinner"></div>

          <p>
            Carregando eventos...
          </p>
        </div>

        <!-- Erro -->
        <div
          v-else-if="eventStore.error"
          class="state-card state-error card"
        >
          <h3>
            Não foi possível carregar os eventos
          </h3>

          <p>
            {{ eventStore.error }}
          </p>

          <button
            type="button"
            class="btn btn-primary"
            @click="eventStore.fetchEvents()"
          >
            Tentar novamente
          </button>
        </div>

        <!-- Nenhum evento -->
        <div
          v-else-if="!eventStore.hasEvents"
          class="state-card card"
        >
          <h3>
            Nenhum evento encontrado
          </h3>

          <p>
            Tente alterar os termos da busca
            ou remover alguns filtros.
          </p>
        </div>

        <!-- Eventos -->
        <EventList
          v-else
          :events="eventStore.events"
        />

      </section>
    </div>
  </main>
</template>