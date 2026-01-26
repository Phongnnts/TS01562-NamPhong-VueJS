<template>
  <div>
    <h2>Bài 2: Two-way Data Binding với v-model</h2>
    <input v-model="userInput" placeholder="Nhập dữ liệu" />
    <p>Giá trị bạn nhập: {{ userInput }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const userInput = ref("FPL");
</script>
