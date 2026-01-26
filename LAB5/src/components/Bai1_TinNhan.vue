<template>
  <div>
    <h2>Bài 1 : Làm quen cơ bản với sự kiện và binding động</h2>
    <p>{{ message }}</p>
    <button @click="updateMessage">Thay đổi thông điệp</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("Thông điệp ban đầu");

const updateMessage = () => {
  message.value = "Thông điệp đã được thay đổi!";
};
</script>
