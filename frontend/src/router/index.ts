import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import EventDetailsView from '../views/EventDetailsView.vue';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import MyEventsView from '../views/MyEventsView.vue';

import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },

    {
      path: '/events/:id',
      name: 'event-details',
      component: EventDetailsView,
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: '/my',
      name: 'my',
      component: MyEventsView,
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: '/admin/events',
      name: 'admin-events',
      component: () =>
        import(
          '../views/admin/AdminEventsView.vue'
        ),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  // Recupera usuário e token do localStorage
  authStore.loadUser();

  // Usuário não autenticado tentando acessar
  // uma página protegida
  if (
    to.meta.requiresAuth &&
    !authStore.isAuthenticated
  ) {
    return {
      name: 'login',
    };
  }

  // Usuário já autenticado tentando acessar o login
  if (
    to.name === 'login' &&
    authStore.isAuthenticated
  ) {
    return {
      name: 'home',
    };
  }

  // Usuário comum tentando acessar área administrativa
  if (
    to.meta.requiresAdmin &&
    !authStore.isAdmin
  ) {
    return {
      name: 'home',
    };
  }
});

export default router;