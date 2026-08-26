<script setup lang="ts">
import EventCard from './EventCard.vue';

import type { Event } from '../types/event';

defineProps<{
  events: Event[];
}>();
</script>

<template>
  <div class="event-list">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    />
  </div>
</template>