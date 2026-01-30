import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/bai1',
      name: 'bai1',
      component: () => import('../views/Bai1.vue'),
    },
    {
      path: '/bai2',
      name: 'bai2',
      component: () => import('../views/Bai2.vue'),
    },
    {
      path: '/bai3',
      name: 'bai3',
      component: () => import('../views/Bai3.vue'),
    },
    {
      path: '/bai4',
      name: 'bai4',
      component: () => import('../views/Bai4.vue'),
    },
  ],
})

export default router
