<template>
  <div>
    <h2>Đây Là Trang Danh sách Blog</h2>

    <ul>
      <li v-for="b in blogs" :key="b.id">
        <router-link :to="{ name: 'BlogPost', params: { id: b.id } }">
          {{ b.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [
        { id: 1, title: 'Vue Router Basics' },
        { id: 2, title: 'Nested Routes' },
        { id: 3, title: 'Route Guard' },
      ],
    }
  },
}
</script>
