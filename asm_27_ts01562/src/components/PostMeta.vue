<template>
  <div class="post-meta text-muted mb-4">
    <span>✍️ {{ author }}</span>
    <span class="mx-2">•</span>
    <span>🕒 {{ date }}</span>
  </div>
</template>

<script setup>
defineProps({
  author: String,
  date: String,
})
</script>

<style scoped>
.post-meta {
  font-size: 0.9rem;
}
</style>
