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
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: () => import('@/pages/questionnaire/index.vue'),
      meta: {
        title: "Questionnaire",
        requiresAuth: false
      },
    },
    {
      path: '/quizzes',
      name: 'quizzes',
      component: () => import('@/pages/quizzes/index.vue'),
      meta: {
        title: "Quizzes",
        requiresAuth: false
      },
    },
    {
      path: '/reading-materials',
      name: 'reading_materials',
      component: () => import('@/pages/reading-materials/index.vue'),
      meta: {
        title: "Reading Materials",
        requiresAuth: false
      },
    },
    {
      path: '/video-tutorials',
      name: 'video_tutorials',
      component: () => import('@/pages/video-tutorials/index.vue'),
      meta: {
        title: "Video Tutorials",
        requiresAuth: false
      },
    },
    {
      path: '/users-admin',
      name: 'users_admin',
      component: () => import('@/pages/users-admin/index.vue'),
      meta: {
        title: "Users | Admin",
        requiresAuth: false
      },
    },
    {
      path: '/users-student',
      name: 'users_student',
      component: () => import('@/pages/users-student/index.vue'),
      meta: {
        title: "Users | Student",
        requiresAuth: false
      },
    },
  ],
})

export default router
