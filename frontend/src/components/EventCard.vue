<script setup lang="ts">
import type { Event } from '../types/event';

defineProps<{
  event: Event;
}>();
</script>

<template>
  <article class="event-card">
    <div class="event-card__content">
      <span class="event-card__category">
        {{ event.category }}
      </span>

      <h3>{{ event.title }}</h3>

      <p>{{ event.description }}</p>

      <div class="event-card__info">
        <span>
          📅 {{ event.date }}
        </span>

        <span>
          🕐 {{ event.time }}
        </span>

        <span>
          📍 {{ event.location }}
        </span>
      </div>

      <RouterLink
        :to="`/events/${event.id}`"
        class="event-card__button"
      >
        Ver detalhes
      </RouterLink>
    </div>
  </article>
</template>