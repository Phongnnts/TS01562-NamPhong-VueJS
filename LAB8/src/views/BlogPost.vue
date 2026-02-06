<template>
  <div>
    <h2>Xem chi tiết </h2>

    <div v-if="blog">
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.content }}</p>
    </div>

    <p v-else>Không tìm thấy bài viết</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [
        { id: 1, title: 'Vue Router Basics', content: 'Học Vue Router từ cơ bản.' },
        { id: 2, title: 'Nested Routes', content: 'Tìm hiểu router lồng nhau.' },
        { id: 3, title: 'Route Guard', content: 'Bảo vệ route bằng beforeEach.' },
      ],
    }
  },
  computed: {
    blog() {
      const id = Number(this.$route.params.id)
      return this.blogs.find((b) => b.id === id)
    },
  },
}
</script>
