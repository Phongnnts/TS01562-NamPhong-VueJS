<template>
  <nav class="navbar navbar-expand-lg bg-white border-bottom">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        Energy Pilates
      </router-link>

      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Trang chủ</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Đăng nhập</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Đăng ký</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">Cá nhân</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
