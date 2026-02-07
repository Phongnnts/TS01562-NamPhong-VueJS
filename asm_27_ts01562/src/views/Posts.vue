<template>
  <div class="posts-page">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-5">
      <div>
        <h3 class="fw-bold mb-2">Tất cả bài viết</h3>
        <p class="text-muted">Khám phá kiến thức từ cộng đồng</p>
      </div>
      <router-link v-if="user" to="/create" class="btn btn-primary">
        <i class="bi bi-plus-lg me-2"></i>Viết bài mới
      </router-link>
    </div>

    <!-- Search -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-search"></i>
          </span>
          <input
            v-model="searchQuery"
            type="search"
            class="form-control"
            placeholder="Tìm kiếm bài viết..."
            @keyup.enter="searchPosts"
          />
          <button class="btn btn-primary" @click="searchPosts">
            <i class="bi bi-search me-2"></i>Tìm kiếm
          </button>
        </div>
      </div>
    </div>

    <!-- Posts List -->
    <div v-if="filteredPosts.length > 0">
      <div class="row g-4">
        <div class="col-lg-6" v-for="post in filteredPosts" :key="post.id">
          <div class="card border-0 shadow-sm h-100 hover-lift">
            <div class="card-body">
              <h5 class="card-title fw-bold mb-3">{{ post.title }}</h5>
              <p class="card-text text-muted mb-4">{{ truncateText(post.content, 120) }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <div class="d-flex align-items-center mb-2">
                    <img
                      :src="getUserAvatar(post.authorEmail)"
                      class="rounded-circle me-2"
                      width="24"
                      height="24"
                    />
                    <small class="fw-medium">{{ post.author }}</small>
                  </div>
                  <small class="text-muted">
                    <i class="bi bi-calendar me-1"></i>{{ formatDate(post.createdAt) }}
                    <i class="bi bi-eye ms-3 me-1"></i>{{ post.views }}
                    <i class="bi bi-chat ms-3 me-1"></i>{{ getCommentCount(post.id) }}
                  </small>
                </div>
                <router-link :to="`/post/${post.id}`" class="btn btn-sm btn-outline-primary">
                  Đọc tiếp
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-5">
      <i class="bi bi-search display-1 text-muted mb-3"></i>
      <h5>Không tìm thấy bài viết</h5>
      <p class="text-muted mb-4">Hãy thử tìm kiếm với từ khóa khác</p>
      <button v-if="searchQuery" class="btn btn-outline-primary" @click="clearSearch">
        <i class="bi bi-arrow-clockwise me-2"></i>Xóa tìm kiếm
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAllPosts } from '../services/post'
import { getCurrentUser } from '../services/auth'

const user = ref(null)
const posts = ref([])
const searchQuery = ref('')

onMounted(() => {
  user.value = getCurrentUser()
  posts.value = getAllPosts()
})

// Filter posts by search
const filteredPosts = computed(() => {
  if (!searchQuery.value.trim()) {
    return posts.value
  }

  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query),
  )
})

const searchPosts = () => {
  // Search logic is handled by computed property
}

const clearSearch = () => {
  searchQuery.value = ''
}

const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const getCommentCount = (postId) => {
  const comments = JSON.parse(localStorage.getItem('comments') || '[]')
  return comments.filter((comment) => comment.postId === postId).length
}

const getUserAvatar = (email) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find((u) => u.email === email)
  return user?.avatar || 'https://ui-avatars.com/api/?name=User&background=ccc&color=fff'
}
</script>

<style scoped>
.posts-page {
  min-height: calc(100vh - 300px);
}

.hover-lift:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card {
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}
</style>
