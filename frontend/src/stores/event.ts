import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import api from '../services/api';

import type {
  Event,
  EventFilters,
} from '../types/event';

export const useEventStore = defineStore(
  'event',
  () => {
    const events = ref<Event[]>([]);

    const loading = ref(false);

    const error = ref('');

    const hasEvents = computed(
      () => events.value.length > 0
    );

    async function fetchEvents(
      filters: EventFilters = {}
    ) {
      loading.value = true;
      error.value = '';

      try {
        const response =
          await api.get<Event[]>(
            '/events',
            {
              params: filters,
            }
          );

        events.value = response.data;
      } catch (err: any) {
        console.error(err);

        error.value =
          err.response?.data?.message ||
          'Não foi possível carregar os eventos.';

        events.value = [];
      } finally {
        loading.value = false;
      }
    }

    async function fetchEventById(
      id: number
    ): Promise<Event> {
      try {
        const response =
          await api.get<Event>(
            `/events/${id}`
          );

        return response.data;
      } catch (err: any) {
        console.error(err);

        error.value =
          err.response?.data?.message ||
          'Não foi possível carregar o evento.';

        throw err;
      }
    }

    async function createEvent(
      event: Omit<Event, 'id'>
    ) {
      loading.value = true;
      error.value = '';

      try {
        const response =
          await api.post(
            '/events',
            event
          );

        events.value.push(
          response.data.event
        );

        return response.data;
      } catch (err: any) {
        console.error(err);

        error.value =
          err.response?.data?.message ||
          'Não foi possível criar o evento.';

        throw err;
      } finally {
        loading.value = false;
      }
    }

    async function updateEvent(
      id: number,
      event: Omit<Event, 'id'>
    ) {
      loading.value = true;
      error.value = '';

      try {
        const response =
          await api.put(
            `/events/${id}`,
            event
          );

        const index =
          events.value.findIndex(
            (item) => item.id === id
          );

        if (index !== -1) {
          events.value[index] =
            response.data.event;
        }

        return response.data;
      } catch (err: any) {
        console.error(err);

        error.value =
          err.response?.data?.message ||
          'Não foi possível atualizar o evento.';

        throw err;
      } finally {
        loading.value = false;
      }
    }

    async function deleteEvent(
      id: number
    ) {
      loading.value = true;
      error.value = '';

      try {
        const response =
          await api.delete(
            `/events/${id}`
          );

        events.value =
          events.value.filter(
            (event) => event.id !== id
          );

        return response.data;
      } catch (err: any) {
        console.error(err);

        error.value =
          err.response?.data?.message ||
          'Não foi possível excluir o evento.';

        throw err;
      } finally {
        loading.value = false;
      }
    }

    return {
      events,
      loading,
      error,
      hasEvents,
      fetchEvents,
      fetchEventById,
      createEvent,
      updateEvent,
      deleteEvent,
    };
  }
);