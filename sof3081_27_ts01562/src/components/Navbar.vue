<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold">
        Energy Pilates
      </router-link>

      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Bài viết</router-link>
        </li>

        <li v-if="!isLogin" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            Tài khoản
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link class="dropdown-item" to="/login"
                >Đăng nhập</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item" to="/register"
                >Đăng ký</router-link
              >
            </li>
          </ul>
        </li>

        <li v-else class="nav-item">
          <a class="nav-link" @click="logout">Đăng xuất</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import authService from "@/services/authService";
import { computed } from "vue";

const isLogin = computed(() => authService.isLogin());

function logout() {
  authService.logout();
  location.href = "/";
}
</script>
