<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <strong>Lab 6 - VueJS</strong>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/bai1">Bài 1</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/bai2">Bài 2</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/bai3">Bài 3</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/bai4">Bài 4</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
