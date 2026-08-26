import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import api from '../services/api';

import type { Event } from '../types/event';

export const useRegistrationStore = defineStore(
  'registration',
  () => {
    const myEvents = ref<Event[]>([]);

    const loading = ref(false);

    const error = ref('');

    const hasRegistrations = computed(
      () => myEvents.value.length > 0
    );

    async function fetchMyEvents() {
      loading.value = true;
      error.value = '';

      try {
        const response =
          await api.get<Event[]>('/events/my');

        myEvents.value = response.data;
      } catch (err: any) {
        console.error(err);

        error.value =
          err.response?.data?.message ||
          'Não foi possível carregar seus eventos.';

        myEvents.value = [];
      } finally {
        loading.value = false;
      }
    }

    async function register(eventId: number) {
      loading.value = true;
      error.value = '';

      try {
        const response = await api.post(
          `/events/${eventId}/register`
        );

        await fetchMyEvents();

        return response.data;
      } catch (err: any) {
        console.error(err);

        error.value =
          err.response?.data?.message ||
          'Não foi possível realizar a inscrição.';

        throw err;
      } finally {
        loading.value = false;
      }
    }

    async function cancelRegistration(
      eventId: number
    ) {
      loading.value = true;
      error.value = '';

      try {
        const response = await api.delete(
          `/events/${eventId}/register`
        );

        await fetchMyEvents();

        return response.data;
      } catch (err: any) {
        console.error(err);

        error.value =
          err.response?.data?.message ||
          'Não foi possível cancelar a inscrição.';

        throw err;
      } finally {
        loading.value = false;
      }
    }

    function isRegistered(eventId: number) {
      return myEvents.value.some(
        (event) => event.id === eventId
      );
    }

    return {
      myEvents,
      loading,
      error,
      hasRegistrations,
      fetchMyEvents,
      register,
      cancelRegistration,
      isRegistered,
    };
  }
);