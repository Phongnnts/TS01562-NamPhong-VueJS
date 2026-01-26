import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import PostDetail from "@/views/PostDetail.vue";
import CreatePost from "@/views/CreatePost.vue";
import Profile from "@/views/Profile.vue";
import authService from "@/services/authService";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/posts/:id", component: PostDetail },
  {
    path: "/create-post",
    component: CreatePost,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isLogin()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
