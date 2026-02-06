<template>
  <div>
    <h2>Login</h2>
    <button @click="login">Đăng nhập</button>
  </div>
</template>

<script>
import { login } from '../router'

export default {
  methods: {
    login() {
      login()
      this.$router.push({ name: 'Dashboard' })
    },
  },
}
</script>
