<template>
  <div class="container my-5" style="max-width: 420px">
    <h3 class="text-center mb-4">Đăng ký</h3>

    <form @submit.prevent="register">
      <div class="mb-3">
        <label class="form-label">Họ tên</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Mật khẩu</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>

      <button class="btn btn-primary w-100">Đăng ký</button>

      <p class="text-center mt-3">
        Đã có tài khoản?
        <router-link to="/login">Đăng nhập</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/store/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  auth.register(name.value, email.value, password.value)
  router.push('/')
}
</script>
