import { createRouter, createWebHistory } from 'vue-router'

// import component theo cấu trúc hiện tại
import Bai1 from '../components/bai1.vue'
import Bai2 from '../components/bai2.vue'
import Bai3 from '../components/bai3.vue'
import Bai4 from '../components/bai4.vue'
import Login from '../components/LoginComponent.vue'
import Comment from '../components/CommentComponent.vue'

const routes = [
  {
    path: '/',
    redirect: '/bai1',
  },
  {
    path: '/bai1',
    component: Bai1,
  },
  {
    path: '/bai2',
    component: Bai2,
  },
  {
    path: '/bai3',
    component: Bai3,
  },
  {
    path: '/bai4',
    component: Bai4,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/comment',
    component: Comment,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
