<template>
  <div class="col-md-4">
    <div v-if="!logged">
      <h3>Đăng nhập</h3>
      <form @submit.prevent="login">
        <input class="form-control mb-2" v-model="email" placeholder="Email">
        <small class="text-danger">{{ emailErr }}</small>

        <input type="password" class="form-control mt-2" v-model="pass" placeholder="Mật khẩu">
        <small class="text-danger">{{ passErr }}</small>

        <button class="btn btn-primary mt-2">Đăng nhập</button>
      </form>
    </div>

    <div v-else>
      <h4>Chào mừng {{ email }}</h4>
      <button class="btn btn-secondary" @click="logout">Đăng xuất</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const pass = ref('')
const logged = ref(false)
const emailErr = ref('')
const passErr = ref('')

const login = () => {
  emailErr.value = passErr.value = ''
  if (!email.value.includes('@')) emailErr.value = 'Email không hợp lệ'
  if (!pass.value) passErr.value = 'Mật khẩu trống'
  if (!emailErr.value && !passErr.value) logged.value = true
}
const logout = () => logged.value = false
</script>
