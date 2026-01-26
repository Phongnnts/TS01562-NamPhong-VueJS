<template>
  <div>
    <h3>Danh sách bài viết</h3>

    <div
      v-for="(post, index) in posts"
      :key="index"
      class="post"
      :class="{ highlighted: post.title.length > 20 }"
      :style="{ color: post.textColor }"
    >
      <h4>{{ post.title }}</h4>
      <p>
        <strong>{{ post.author }}</strong>
      </p>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: Array,
});
</script>

<style>
.post {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px 0;
}
.highlighted {
  border: 2px solid orange;
}
</style>
