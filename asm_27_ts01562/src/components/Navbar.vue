<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container">
      <!-- LOGO -->
      <router-link to="/" class="navbar-brand d-flex align-items-center gap-2">
        <img src="/images/logo.png" height="40" />
      </router-link>

      <!-- TOGGLER -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- MENU -->
      <div class="collapse navbar-collapse" id="menu">
        <!-- LEFT MENU -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/posts">
              <i class="bi bi-list"></i> Bài viết
            </router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link"> <i class="bi bi-film"></i> Video </a>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/Profile">
              <i class="bi bi-info-circle"></i> Giới thiệu
            </router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link"> <i class="bi bi-calendar-event"></i> Sự kiện </a>
          </li>

          <!-- ACCOUNT -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
              <i class="bi bi-person"></i> Tài khoản
            </a>

            <!-- NOT LOGIN -->
            <ul v-if="!auth.isLoggedIn" class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/login"> Đăng nhập </router-link>
              </li>
              <li>
                <a class="dropdown-item">Quên mật khẩu</a>
              </li>
              <li>
                <router-link class="dropdown-item" to="/register"> Đăng ký </router-link>
              </li>
            </ul>

            <!-- LOGGED -->
            <ul v-else class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/profile"> Trang cá nhân </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/create"> Đăng bài </router-link>
              </li>
              <li>
                <button class="dropdown-item" @click="auth.logout()">Đăng xuất</button>
              </li>
            </ul>
          </li>
        </ul>

        <!-- RIGHT MENU -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link">Tiếng Việt</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">English</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { auth } from '@/store/auth'
</script>
