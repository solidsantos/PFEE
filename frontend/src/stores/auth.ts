import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import api from '../services/api';

import type { User } from '../types/user';

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null);

    const token = ref<string | null>(
      localStorage.getItem('token')
    );

    const isAuthenticated = computed(
      () => !!token.value
    );

    const isAdmin = computed(
      () => user.value?.role === 'admin'
    );

    async function login(
      email: string,
      password: string
    ) {
      const response =
        await api.post<LoginResponse>(
          '/auth/login',
          {
            email,
            password,
          }
        );

      token.value = response.data.token;

      user.value = response.data.user;

      localStorage.setItem(
        'token',
        response.data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      return response.data;
    }

    function logout() {
      token.value = null;

      user.value = null;

      localStorage.removeItem('token');

      localStorage.removeItem('user');
    }

    function loadUser() {
      const storedUser =
        localStorage.getItem('user');

      const storedToken =
        localStorage.getItem('token');

      if (storedUser && storedToken) {
        user.value = JSON.parse(
          storedUser
        );

        token.value = storedToken;
      }
    }

    return {
      user,
      token,
      isAuthenticated,
      isAdmin,
      login,
      logout,
      loadUser,
    };
  }
);