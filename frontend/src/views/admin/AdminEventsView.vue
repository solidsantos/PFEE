<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useEventStore } from '../../stores/event';
import type { Event } from '../../types/event';
import EventForm from '../../components/EventForm.vue';

const eventStore = useEventStore();
const router = useRouter();

const showForm = ref(false);
const editingEvent = ref<Event | null>(null);

onMounted(() => {
  eventStore.fetchEvents();
});

function goToHome() {
  router.push('/');
}

function openCreateForm() {
  editingEvent.value = null;
  showForm.value = true;
}

function openEditForm(event: Event) {
  editingEvent.value = event;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  editingEvent.value = null;
}

async function handleDelete(id: number) {
  const confirmed = window.confirm(
    'Tem certeza que deseja excluir este evento?'
  );

  if (!confirmed) {
    return;
  }

  try {
    await eventStore.deleteEvent(id);
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <main class="page">
    <div class="container">

      <!-- Cabeçalho -->
      <header class="admin-header card">
        <div class="admin-brand">
          <span class="section-label">
            ADMINISTRAÇÃO
          </span>

          <h1>Gerenciar eventos</h1>

          <p>
            Crie, edite e gerencie os eventos
            do sistema.
          </p>
        </div>

        <div class="admin-actions">
          <button
            type="button"
            class="btn btn-secondary"
            @click="goToHome"
          >
            ← Voltar para a Home
          </button>

          <button
            type="button"
            class="btn btn-primary"
            @click="openCreateForm"
          >
            + Novo evento
          </button>
        </div>
      </header>

      <!-- Formulário -->
      <section
        v-if="showForm"
        class="admin-form card"
      >
        <EventForm
          :key="editingEvent?.id ?? 'new'"
          :event="editingEvent"
          @saved="closeForm"
          @cancel="closeForm"
        />
      </section>

      <!-- Separador -->
      <div
        v-if="showForm"
        class="admin-divider"
      ></div>

      <!-- Título da lista -->
      <section class="admin-events-section">

        <div class="events-heading">
          <div>
            <span class="section-label">
              EVENTOS
            </span>

            <h2>Eventos cadastrados</h2>
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

        <!-- Carregando -->
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
            Nenhum evento cadastrado
          </h3>

          <p>
            Clique em "Novo evento" para
            cadastrar o primeiro evento.
          </p>

          <button
            type="button"
            class="btn btn-primary"
            @click="openCreateForm"
          >
            + Novo evento
          </button>
        </div>

        <!-- Lista de eventos -->
        <section
          v-else
          class="admin-event-list"
        >
          <article
            v-for="event in eventStore.events"
            :key="event.id"
            class="admin-event-card card"
          >
            <div class="admin-event-content">

              <span class="event-category">
                {{ event.category }}
              </span>

              <h3>
                {{ event.title }}
              </h3>

              <p class="event-description">
                {{ event.description }}
              </p>

              <div class="event-info-grid">

                <div>
                  <strong>Data</strong>
                  <span>{{ event.date }}</span>
                </div>

                <div>
                  <strong>Horário</strong>
                  <span>{{ event.time }}</span>
                </div>

                <div>
                  <strong>Local</strong>
                  <span>{{ event.location }}</span>
                </div>

                <div>
                  <strong>Organizador</strong>
                  <span>{{ event.organizer }}</span>
                </div>

                <div>
                  <strong>Capacidade</strong>
                  <span>{{ event.capacity }} vagas</span>
                </div>

              </div>
            </div>

            <div class="admin-event-actions">

              <button
                type="button"
                class="btn btn-primary"
                @click="openEditForm(event)"
              >
                Editar
              </button>

              <button
                type="button"
                class="btn btn-danger"
                @click="handleDelete(event.id)"
              >
                Excluir
              </button>

            </div>
          </article>
        </section>

      </section>
    </div>
  </main>
</template>