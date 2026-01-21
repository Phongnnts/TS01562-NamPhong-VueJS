<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Danh sách bài viết</h2>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="(post, index) in posts" :key="index">
        <div class="card h-100 shadow">
          <img :src="post.image" class="card-img-top" alt="Hình bài viết" />

          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.description }}</p>
          </div>

          <div class="card-footer text-center">
            <button class="btn btn-outline-primary" @click="showAlert(post.title)">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          title: 'VueJS Cơ Bản',
          description: 'Học các khái niệm cơ bản của VueJS dễ hiểu.',
          image: 'https://picsum.photos/400/250?random=1',
        },
        {
          title: 'Bootstrap 5',
          description: 'Thiết kế giao diện nhanh chóng và đẹp mắt.',
          image: 'https://picsum.photos/400/250?random=2',
        },
        {
          title: 'Frontend Backend',
          description: 'Kết nối frontend với backend hiệu quả.',
          image: 'https://picsum.photos/400/250?random=3',
        },
      ],
    }
  },
  methods: {
    showAlert(title) {
      alert('Bạn đang xem bài viết: ' + title)
    },
  },
}
</script>
