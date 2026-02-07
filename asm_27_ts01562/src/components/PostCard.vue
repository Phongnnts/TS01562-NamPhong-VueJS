<template>
  <article class="post-card">
    <router-link :to="`/post/${post.slug}`">
      <h3 class="post-title">{{ post.title }}</h3>
    </router-link>

    <PostMeta :post="post" />

    <p class="post-excerpt">
      {{ excerpt }}
    </p>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import PostMeta from './PostMeta.vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const excerpt = computed(() => {
  return props.post.content.length > 160
    ? props.post.content.slice(0, 160) + '...'
    : props.post.content
})
</script>

<style scoped>
.post-card {
  padding: 28px 0;
  border-bottom: 1px solid #eaeaea;
}

.post-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 6px;
  line-height: 1.4;
}

.post-title:hover {
  text-decoration: underline;
}

.post-excerpt {
  margin-top: 10px;
  color: #555;
  font-size: 16px;
}
</style>
