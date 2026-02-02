<template>
  <form @submit.prevent="login">
    <input
      class="form-control mb-2"
      v-model="name"
      placeholder="Tên đăng nhập"
    />
    <input
      type="password"
      class="form-control mb-2"
      v-model="pass"
      placeholder="Mật khẩu"
    />
    <button class="btn btn-primary w-100">Đăng nhập</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['success'])
const name = ref('')
const pass = ref('')

const login = () => {
  if (name.value && pass.value) {
    emit('success', name.value)
  }
}
</script>
