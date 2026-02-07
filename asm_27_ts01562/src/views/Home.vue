<template>
  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero-section bg-primary text-white rounded-3 p-5 mb-5">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold mb-3">Chia sẻ kiến thức & Kết nối cộng đồng</h1>
          <p class="lead mb-4 opacity-75">
            BlogVue là nền tảng đơn giản để bạn chia sẻ kiến thức, kinh nghiệm và kết nối với những
            người có cùng đam mê công nghệ.
          </p>
          <div class="d-flex flex-wrap gap-3">
            <template v-if="!user">
              <router-link to="/register" class="btn btn-light btn-lg px-4">
                <i class="bi bi-rocket-takeoff me-2"></i>Bắt đầu ngay
              </router-link>
              <router-link to="/posts" class="btn btn-outline-light btn-lg px-4">
                <i class="bi bi-compass me-2"></i>Khám phá
              </router-link>
            </template>
            <template v-else>
              <router-link to="/create" class="btn btn-light btn-lg px-4">
                <i class="bi bi-pencil-square me-2"></i>Viết bài mới
              </router-link>
              <router-link to="/posts" class="btn btn-outline-light btn-lg px-4">
                <i class="bi bi-newspaper me-2"></i>Xem bài viết
              </router-link>
            </template>
          </div>
        </div>
        <div class="col-lg-6 text-center mt-4 mt-lg-0">
          <img
            src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Blogging"
            class="img-fluid rounded shadow-lg"
          />
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="row mb-5">
      <div class="col-md-4 mb-3">
        <div class="card text-center border-0 shadow-sm">
          <div class="card-body">
            <i class="bi bi-file-text display-4 text-primary mb-3"></i>
            <h3 class="fw-bold">{{ stats.posts }}</h3>
            <p class="text-muted mb-0">Bài viết</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card text-center border-0 shadow-sm">
          <div class="card-body">
            <i class="bi bi-people display-4 text-success mb-3"></i>
            <h3 class="fw-bold">{{ stats.users }}</h3>
            <p class="text-muted mb-0">Thành viên</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card text-center border-0 shadow-sm">
          <div class="card-body">
            <i class="bi bi-chat-dots display-4 text-info mb-3"></i>
            <h3 class="fw-bold">{{ stats.comments }}</h3>
            <p class="text-muted mb-0">Bình luận</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Posts -->
    <div class="mb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold mb-0">Bài viết mới nhất</h3>
        <router-link to="/posts" class="btn btn-outline-primary">
          Xem tất cả <i class="bi bi-arrow-right ms-2"></i>
        </router-link>
      </div>

      <div v-if="posts.length > 0">
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="post in posts.slice(0, 3)" :key="post.id">
            <div class="card h-100 border-0 shadow-sm hover-shadow">
              <div class="card-body">
                <h5 class="card-title fw-bold">{{ truncateText(post.title, 50) }}</h5>
                <p class="card-text text-muted">{{ truncateText(post.content, 100) }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <small class="text-muted d-block">
                      <i class="bi bi-person me-1"></i>{{ post.author }}
                    </small>
                    <small class="text-muted">
                      <i class="bi bi-calendar me-1"></i>{{ formatDate(post.createdAt) }}
                    </small>
                  </div>
                  <router-link :to="`/post/${post.id}`" class="btn btn-sm btn-outline-primary">
                    Đọc
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-5">
        <i class="bi bi-newspaper display-1 text-muted mb-3"></i>
        <h5>Chưa có bài viết nào</h5>
        <p class="text-muted mb-4">Hãy là người đầu tiên chia sẻ kiến thức!</p>
        <router-link v-if="user" to="/create" class="btn btn-primary">
          <i class="bi bi-plus-lg me-2"></i>Viết bài đầu tiên
        </router-link>
        <router-link v-else to="/register" class="btn btn-primary">
          <i class="bi bi-person-plus me-2"></i>Đăng ký để viết bài
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllPosts } from '../services/post'
import { getCurrentUser } from '../services/auth'

const user = ref(null)
const posts = ref([])

onMounted(() => {
  user.value = getCurrentUser()
  posts.value = getAllPosts()
})

const stats = {
  posts: JSON.parse(localStorage.getItem('posts') || '[]').length,
  users: JSON.parse(localStorage.getItem('users') || '[]').length,
  comments: JSON.parse(localStorage.getItem('comments') || '[]').length,
}

const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
}

.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  transition: box-shadow 0.3s ease;
}

.card {
  border-radius: 0.75rem;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
