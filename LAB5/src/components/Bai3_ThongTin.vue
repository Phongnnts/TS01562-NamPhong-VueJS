<template>
  <div>
    <h2>Bài 3: Nhập và hiển thị thông tin cá nhân</h2>

    <input v-model="userInfo.name" placeholder="Họ và tên" />
    <input v-model="userInfo.age" type="number" placeholder="Tuổi" />
    <input v-model="userInfo.email" placeholder="Email" />

    <div class="result">
      <h3>Thông tin đã nhập</h3>
      <p>Họ tên: {{ userInfo.name }}</p>
      <p>Tuổi: {{ userInfo.age }}</p>
      <p>Email: {{ userInfo.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const userInfo = reactive({
  name: "",
  age: "",
  email: "",
});
</script>

<style>
.result {
  background: #222;
  color: white;
  padding: 15px;
  margin-top: 15px;
}
</style>
