
import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from '@/router/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/LoginPage.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/RegistrationPage.vue'),
        },
      ]
    },

    {
      path: '/my',
      children: userRoutes
    },
  ]
})

export default router
