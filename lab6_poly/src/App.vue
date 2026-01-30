<template>
  <div id="app">
    <Navbar />
    <router-view class="container mt-4"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>

<style>
/* Custom minimal styles */
body {
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
