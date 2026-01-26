<template>
  <div class="container mt-5" style="max-width:400px">
    <h4>Đăng nhập</h4>
    <form @submit.prevent="login">
      <input v-model="email" class="form-control mb-2" placeholder="Email" />
      <input v-model="password" type="password" class="form-control mb-2" placeholder="Mật khẩu" />
      <button class="btn btn-info w-100 text-white">Đăng nhập</button>
    </form>
  </div>
</template>

<script setup>
import authService from '@/services/authService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

function login() {
  authService.login({ email: email.value })
  router.push('/')
}
</script>
