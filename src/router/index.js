
import { createRouter, createWebHistory } from 'vue-router';

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
  ]
})

export default router
