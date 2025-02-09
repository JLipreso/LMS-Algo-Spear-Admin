import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: () => import('@/pages/signin/index.vue'),
      meta: {
        title: "Sign In",
        requiresAuth: false
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/dashboard/index.vue'),
      meta: {
        title: "Dashboard",
        requiresAuth: false
      },
    },
  ],
})

export default router
