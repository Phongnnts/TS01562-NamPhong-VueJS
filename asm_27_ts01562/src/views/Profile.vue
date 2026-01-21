<template>
  <div class="container my-5" style="max-width: 500px">
    <h3>Trang cá nhân</h3>

    <div class="mb-3">
      <label>Họ tên</label>
      <input v-model="auth.user.name" class="form-control" />
    </div>

    <div class="mb-3">
      <label>Email</label>
      <input v-model="auth.user.email" class="form-control" disabled />
    </div>

    <p class="text-success">✔ Thông tin đã được cập nhật</p>
  </div>
</template>

<script setup>
import { auth } from '@/store/auth'
</script>
