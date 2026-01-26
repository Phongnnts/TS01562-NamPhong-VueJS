<template>
  <div class="card mb-3">
    <img :src="post.image" class="card-img-top" />
    <div class="card-body">
      <h6>{{ post.title }}</h6>
      <p class="small text-muted">{{ post.content }}</p>
      <router-link :to="`/posts/${post.id}`">Xem chi tiết</router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: Object
})
</script>
