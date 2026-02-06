<template>
  <div>
    <nav style="display: flex; justify-content: start; gap: 20px">
      <router-link to="/">Home</router-link> <router-link to="/blog">Blog</router-link>
      <router-link to="/profile/info">Profile</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/login">Login</router-link>
    </nav>

    <router-view />
  </div>
</template>
