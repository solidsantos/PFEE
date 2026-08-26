<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  error.value = '';
  loading.value = true;

  try {
    await authStore.login(email.value, password.value);
    router.push('/');
  } catch (err: any) {
    error.value =
      err.response?.data?.message ||
      'Não foi possível realizar o login.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="page login-page">
    <div class="login-container">
      <section class="login-card card">
        <div class="login-header">
          <div class="login-brand-icon">
            E
          </div>

          <span class="section-label">
            EVENTOS
          </span>

          <h1>
            Sistema de Gestão de Eventos
          </h1>

          <p>
            Entre na sua conta para encontrar e participar
            de eventos.
          </p>
        </div>

        <form
          class="login-form"
          @submit.prevent="handleLogin"
        >
          <div class="form-group">
            <label for="email">
              E-mail
            </label>

            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">
              Senha
            </label>

            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Digite sua senha"
              autocomplete="current-password"
              required
            />
          </div>

          <div
            v-if="error"
            class="login-error"
          >
            {{ error }}
          </div>

          <button
            type="submit"
            class="btn btn-primary login-button"
            :disabled="loading"
          >
            {{
              loading
                ? 'Entrando...'
                : 'Entrar'
            }}
          </button>
        </form>
      </section>
    </div>
  </main>
</template>