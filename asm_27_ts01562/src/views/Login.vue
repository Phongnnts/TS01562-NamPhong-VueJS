<template>
  <div class="container my-5" style="max-width: 420px">
    <h3 class="text-center mb-4">Đăng nhập</h3>

    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Mật khẩu</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>

      <button class="btn btn-success w-100">Đăng nhập</button>

      <p class="text-center mt-3">
        Chưa có tài khoản?
        <router-link to="/register">Đăng ký</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  const ok = auth.login(email.value, password.value)
  if (ok) router.push('/')
}
</script>
