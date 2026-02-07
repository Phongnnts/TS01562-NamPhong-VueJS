<template>
  <div class="my-posts-page">
    <div class="container py-5">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Đang tải bài viết...</p>
      </div>

      <!-- Not Logged In -->
      <div v-else-if="!user" class="text-center py-5">
        <i class="bi bi-person-x display-1 text-muted mb-3"></i>
        <h5>Bạn chưa đăng nhập</h5>
        <p class="text-muted mb-4">Vui lòng đăng nhập để xem bài viết của bạn</p>
        <router-link to="/login" class="btn btn-primary">
          <i class="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
        </router-link>
      </div>

      <!-- My Posts Content -->
      <div v-else>
        <!-- Page Header -->
        <div class="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 class="fw-bold mb-2">Bài viết của tôi</h1>
            <p class="text-muted">Quản lý và theo dõi bài viết của bạn</p>
          </div>
          <router-link to="/create" class="btn btn-primary">
            <i class="bi bi-plus-lg me-2"></i>Viết bài mới
          </router-link>
        </div>

        <!-- Stats Cards -->
        <div class="row g-4 mb-5">
          <div class="col-md-3" v-for="stat in stats" :key="stat.id">
            <div class="card border-0 shadow-sm" :style="{ borderLeft: `4px solid ${stat.color}` }">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div
                    class="stat-icon me-3"
                    :style="{ backgroundColor: stat.color + '20', color: stat.color }"
                  >
                    <i :class="stat.icon"></i>
                  </div>
                  <div>
                    <div class="stat-number">{{ stat.value }}</div>
                    <div class="stat-label">{{ stat.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter and Search -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-6">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-search"></i>
                  </span>
                  <input
                    v-model="searchQuery"
                    type="search"
                    class="form-control"
                    placeholder="Tìm kiếm bài viết..."
                    @keyup.enter="filterPosts"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex gap-2">
                  <select v-model="statusFilter" class="form-select" @change="filterPosts">
                    <option value="">Tất cả trạng thái</option>
                    <option value="published">Đã xuất bản</option>
                    <option value="draft">Bản nháp</option>
                    <option value="pending">Chờ duyệt</option>
                  </select>
                  <select v-model="sortBy" class="form-select" @change="filterPosts">
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="popular">Phổ biến nhất</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Posts Table -->
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <!-- Empty State -->
            <div v-if="filteredPosts.length === 0" class="text-center py-5">
              <i class="bi bi-file-text display-1 text-muted mb-3"></i>
              <h5>Chưa có bài viết nào</h5>
              <p class="text-muted mb-4">Bắt đầu chia sẻ kiến thức của bạn với cộng đồng</p>
              <router-link to="/create" class="btn btn-primary">
                <i class="bi bi-plus-lg me-2"></i>Viết bài đầu tiên
              </router-link>
            </div>

            <!-- Posts Table -->
            <div v-else>
              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Tiêu đề</th>
                      <th>Danh mục</th>
                      <th>Trạng thái</th>
                      <th>Lượt xem</th>
                      <th>Bình luận</th>
                      <th>Ngày đăng</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="post in paginatedPosts" :key="post.id">
                      <!-- Title -->
                      <td>
                        <router-link
                          :to="`/post/${post.id}`"
                          class="text-decoration-none text-dark fw-medium"
                        >
                          {{ truncateText(post.title, 50) }}
                        </router-link>
                      </td>

                      <!-- Category -->
                      <td>
                        <span v-if="post.category" class="badge bg-primary">
                          {{ post.category }}
                        </span>
                        <span v-else class="text-muted">-</span>
                      </td>

                      <!-- Status -->
                      <td>
                        <span :class="getStatusBadge(post.status)">
                          {{ getStatusText(post.status) }}
                        </span>
                      </td>

                      <!-- Views -->
                      <td>
                        <div class="d-flex align-items-center">
                          <i class="bi bi-eye text-muted me-2"></i>
                          {{ post.views || 0 }}
                        </div>
                      </td>

                      <!-- Comments -->
                      <td>
                        <div class="d-flex align-items-center">
                          <i class="bi bi-chat text-muted me-2"></i>
                          {{ getCommentCount(post.id) }}
                        </div>
                      </td>

                      <!-- Date -->
                      <td class="text-muted">
                        {{ formatDate(post.createdAt) }}
                      </td>

                      <!-- Actions -->
                      <td>
                        <div class="d-flex gap-2">
                          <router-link
                            :to="`/post/${post.id}`"
                            class="btn btn-sm btn-outline-primary"
                            title="Xem"
                          >
                            <i class="bi bi-eye"></i>
                          </router-link>
                          <router-link
                            :to="`/edit/${post.id}`"
                            class="btn btn-sm btn-outline-warning"
                            title="Chỉnh sửa"
                          >
                            <i class="bi bi-pencil"></i>
                          </router-link>
                          <button
                            class="btn btn-sm btn-outline-danger"
                            @click="deletePost(post.id)"
                            title="Xóa"
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <nav v-if="totalPages > 1" aria-label="Page navigation">
                <ul class="pagination justify-content-center mt-4">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="changePage(currentPage - 1)">
                      <i class="bi bi-chevron-left"></i>
                    </button>
                  </li>

                  <li
                    v-for="page in visiblePages"
                    :key="page"
                    class="page-item"
                    :class="{ active: page === currentPage }"
                  >
                    <button class="page-link" @click="changePage(page)">
                      {{ page }}
                    </button>
                  </li>

                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="changePage(currentPage + 1)">
                      <i class="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <!-- Export Section -->
        <div class="card border-0 shadow-sm mt-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="fw-bold mb-1">Xuất dữ liệu</h6>
                <p class="text-muted mb-0">Xuất tất cả bài viết của bạn</p>
              </div>
              <button class="btn btn-outline-primary" @click="exportPosts">
                <i class="bi bi-download me-2"></i>Xuất bài viết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser } from '../services/auth'
import { getPostsByUser, deletePost } from '../services/post'
import { getCommentCount } from '../services/comment'

const router = useRouter()

// State
const loading = ref(true)
const user = ref(null)
const posts = ref([])

// Filters
const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 10

// Initialize
onMounted(() => {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    loading.value = false
    return
  }

  user.value = currentUser
  loadPosts()
})

// Load posts
const loadPosts = () => {
  if (!user.value) return

  posts.value = getPostsByUser(user.value.id)
  loading.value = false
}

// Computed properties
const stats = computed(() => [
  {
    id: 1,
    label: 'Tổng bài viết',
    value: posts.value.length,
    icon: 'bi bi-file-text',
    color: '#0d6efd',
  },
  {
    id: 2,
    label: 'Đã xuất bản',
    value: posts.value.filter((p) => p.status === 'published').length,
    icon: 'bi bi-check-circle',
    color: '#198754',
  },
  {
    id: 3,
    label: 'Bản nháp',
    value: posts.value.filter((p) => p.status === 'draft').length,
    icon: 'bi bi-pencil',
    color: '#ffc107',
  },
  {
    id: 4,
    label: 'Tổng lượt xem',
    value: posts.value.reduce((sum, post) => sum + (post.views || 0), 0),
    icon: 'bi bi-eye',
    color: '#6f42c1',
  },
])

const filteredPosts = computed(() => {
  let filtered = [...posts.value]

  // Filter by status
  if (statusFilter.value) {
    filtered = filtered.filter((post) => post.status === statusFilter.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query),
    )
  }

  // Sort posts
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case 'popular':
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
      break
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / itemsPerPage)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPosts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Methods
const filterPosts = () => {
  currentPage.value = 1
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const getStatusBadge = (status) => {
  const classes = {
    published: 'badge bg-success',
    draft: 'badge bg-warning',
    pending: 'badge bg-info',
  }
  return classes[status] || 'badge bg-secondary'
}

const getStatusText = (status) => {
  const texts = {
    published: 'Đã xuất bản',
    draft: 'Bản nháp',
    pending: 'Chờ duyệt',
  }
  return texts[status] || 'Không xác định'
}

const getCommentCountForPost = (postId) => {
  return getCommentCount(postId)
}

const deletePostHandler = (postId) => {
  if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
    const success = deletePost(postId)

    if (success) {
      // Reload posts
      loadPosts()
      showToast('Bài viết đã được xóa!', 'success')
    } else {
      showToast('Có lỗi xảy ra khi xóa bài viết.', 'danger')
    }
  }
}

const exportPosts = () => {
  const exportData = {
    user: user.value,
    posts: posts.value,
    exportDate: new Date().toISOString(),
    totalPosts: posts.value.length,
    totalViews: posts.value.reduce((sum, post) => sum + (post.views || 0), 0),
  }

  const dataStr = JSON.stringify(exportData, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

  const exportFileDefaultName = `my-posts-${user.value.username}.json`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()

  showToast('Đã xuất bài viết thành công!', 'success')
}

// Helper functions
const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
  })
}

const showToast = (message, type = 'info') => {
  const toast = document.createElement('div')
  toast.className = `toast align-items-center text-bg-${type} border-0`
  toast.setAttribute('role', 'alert')
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-info-circle'} me-2"></i>
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `

  const container = document.querySelector('.toast-container') || createToastContainer()
  container.appendChild(toast)

  const bsToast = new bootstrap.Toast(toast, { delay: 3000 })
  bsToast.show()

  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove()
  })
}

const createToastContainer = () => {
  const container = document.createElement('div')
  container.className = 'toast-container position-fixed top-0 end-0 p-3'
  document.body.appendChild(container)
  return container
}
</script>

<style scoped>
.my-posts-page {
  min-height: calc(100vh - 140px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.table th {
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  background-color: #f8f9fa;
}

.table td {
  vertical-align: middle;
  padding: 1rem 0.75rem;
}

.pagination .page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.pagination .page-link {
  color: #0d6efd;
  border: none;
  margin: 0 2px;
  border-radius: 0.375rem;
}

.pagination .page-link:hover {
  background-color: #f8f9fa;
}

.card {
  border-radius: 0.75rem;
}
</style>
