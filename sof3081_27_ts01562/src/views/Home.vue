<template>
  <div class="container my-4">
    <h5 class="text-info mb-3">Blog của tôi</h5>

    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script setup>
import PostItem from '@/components/PostItem.vue'
import postService from '@/services/postService'

const posts = postService.getAll()
</script>
