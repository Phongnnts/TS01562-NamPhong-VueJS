<template>
  <div>
    <h6>Bình luận</h6>
    <div v-for="c in comments" :key="c.id">
      <strong>{{ c.author }}</strong>: {{ c.content }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  comments: Array
})
</script>
