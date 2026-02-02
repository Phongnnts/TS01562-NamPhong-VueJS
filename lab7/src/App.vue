<template>
  <Menu @change="current = $event" />

  <div class="container mt-4">
    <Bai1Todo v-if="current === 1" />
    <Bai2Login v-if="current === 2" />
    <Bai3Register v-if="current === 3" />
    <Bai4 v-if="current === 4" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menu from './components/menu.vue'
import Bai1Todo from './components/bai1.vue'
import Bai2Login from './components/bai2.vue'
import Bai3Register from './components/bai3.vue'
import Bai4 from './components/bai4.vue'

const current = ref(1)
</script>
