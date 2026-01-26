<template>
  <form @submit.prevent="submit">
    <input v-model="content" class="form-control mb-2" placeholder="Bình luận..." />
    <button class="btn btn-info text-white">Gửi</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add'])

const content = ref('')

function submit() {
  emit('add', {
    id: Date.now(),
    author: 'User',
    content: content.value
  })
  content.value = ''
}
</script>
