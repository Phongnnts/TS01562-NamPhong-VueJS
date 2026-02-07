<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div class="container">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand fw-bold">
          <i class="bi bi-journal-text me-2"></i>BlogVue
        </router-link>

        <!-- Mobile Toggle -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Content -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <!-- Left Menu -->
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
                <i class="bi bi-house-door me-1"></i>Trang chủ
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/posts"
                class="nav-link"
                :class="{ active: $route.path === '/posts' }"
              >
                <i class="bi bi-file-text me-1"></i>Bài viết
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/about"
                class="nav-link"
                :class="{ active: $route.path === '/about' }"
              >
                <i class="bi bi-info-circle me-1"></i>Giới thiệu
              </router-link>
            </li>
          </ul>

          <!-- Right Menu -->
          <div class="d-flex align-items-center">
            <!-- Create Post Button (visible only when logged in) -->
            <router-link
              v-if="user"
              to="/create"
              class="btn btn-light btn-sm me-3"
              :class="{ 'd-none': $route.path === '/create' }"
            >
              <i class="bi bi-pencil-square me-1"></i>Viết bài
            </router-link>

            <!-- Auth Section -->
            <div class="d-flex align-items-center">
              <template v-if="!user">
                <!-- Guest User -->
                <router-link to="/login" class="btn btn-outline-light btn-sm me-2">
                  <i class="bi bi-box-arrow-in-right me-1"></i>Đăng nhập
                </router-link>
                <router-link to="/register" class="btn btn-light btn-sm">
                  <i class="bi bi-person-plus me-1"></i>Đăng ký
                </router-link>
              </template>
              <template v-else>
                <!-- Logged In User -->
                <div class="dropdown">
                  <button
                    class="btn btn-link text-white text-decoration-none dropdown-toggle d-flex align-items-center p-0"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div class="position-relative">
                      <img
                        :src="
                          user.avatar ||
                          'https://ui-avatars.com/api/?name=' +
                            encodeURIComponent(user.name) +
                            '&background=0d6efd&color=fff'
                        "
                        class="rounded-circle border border-white border-2"
                        width="36"
                        height="36"
                        :alt="user.name"
                        style="object-fit: cover"
                      />
                    </div>
                    <span class="ms-2 d-none d-md-inline">{{ user.name }}</span>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                    <li>
                      <router-link to="/profile" class="dropdown-item d-flex align-items-center">
                        <i class="bi bi-person me-2"></i>
                        <div>
                          <div class="fw-medium">Hồ sơ cá nhân</div>
                          <small class="text-muted">Quản lý tài khoản</small>
                        </div>
                      </router-link>
                    </li>
                    <li v-if="user.role === 'admin'">
                      <router-link to="/admin" class="dropdown-item d-flex align-items-center">
                        <i class="bi bi-shield me-2"></i>
                        <div>
                          <div class="fw-medium">Quản trị</div>
                          <small class="text-muted">Trang quản lý</small>
                        </div>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/my-posts" class="dropdown-item d-flex align-items-center">
                        <i class="bi bi-file-text me-2"></i>
                        <div>
                          <div class="fw-medium">Bài viết của tôi</div>
                          <small class="text-muted">Quản lý bài đăng</small>
                        </div>
                      </router-link>
                    </li>
                    <li><hr class="dropdown-divider my-2" /></li>
                    <li>
                      <button
                        class="dropdown-item d-flex align-items-center text-danger"
                        @click="logout"
                      >
                        <i class="bi bi-box-arrow-right me-2"></i>
                        <div>
                          <div class="fw-medium">Đăng xuất</div>
                          <small class="text-muted">Thoát khỏi hệ thống</small>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container my-4" style="min-height: calc(100vh - 200px)">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5 class="fw-bold mb-2"><i class="bi bi-journal-text me-2"></i>BlogVue</h5>
            <p class="text-light opacity-75 mb-0">Nền tảng blog đơn giản với VueJS và Bootstrap</p>
          </div>
          <div class="col-md-6 text-md-end mt-3 mt-md-0">
            <p class="text-light opacity-75 mb-2">© 2024 BlogVue. Dự án học tập VueJS.</p>
            <div>
              <a href="#" class="text-white opacity-75 me-3" title="Facebook">
                <i class="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" class="text-white opacity-75 me-3" title="Twitter">
                <i class="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" class="text-white opacity-75" title="GitHub">
                <i class="bi bi-github fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, logout as logoutUser } from './services/auth'

const router = useRouter()
const user = ref(null)

// Cập nhật user state
const updateUser = () => {
  user.value = getCurrentUser()
}

// Lifecycle hooks
onMounted(() => {
  updateUser()
  window.addEventListener('auth-state-changed', updateUser)
})

onUnmounted(() => {
  window.removeEventListener('auth-state-changed', updateUser)
})

// Đăng xuất
const logout = () => {
  if (confirm('Bạn có chắc muốn đăng xuất khỏi tài khoản?')) {
    logoutUser()
    user.value = null
    window.dispatchEvent(new Event('auth-state-changed'))
    router.push('/')

    // Show success message
    showToast('Đăng xuất thành công!', 'success')
  }
}

// Hiển thị toast notification
const showToast = (message, type = 'info') => {
  // Tạo toast container nếu chưa có
  let container = document.querySelector('.toast-container')
  if (!container) {
    container = document.createElement('div')
    container.className = 'toast-container position-fixed top-0 end-0 p-3'
    document.body.appendChild(container)
  }

  // Tạo toast
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

  container.appendChild(toast)

  // Khởi tạo Bootstrap Toast
  const bsToast = new bootstrap.Toast(toast, {
    delay: 3000,
    animation: true,
  })
  bsToast.show()

  // Xóa toast sau khi ẩn
  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove()
  })
}
</script>

<style scoped>
.navbar {
  padding: 0.75rem 0;
  z-index: 1030;
}

.nav-link {
  padding: 0.5rem 1rem !important;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.dropdown-toggle {
  transition: all 0.2s ease;
}

.dropdown-toggle:hover {
  opacity: 0.9;
}

.dropdown-toggle::after {
  margin-left: 0.5rem;
  vertical-align: middle;
}

.dropdown-menu {
  border: none;
  border-radius: 0.5rem;
  min-width: 250px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.dropdown-item {
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin: 0.125rem 0.5rem;
  width: calc(100% - 1rem);
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

footer {
  margin-top: auto;
}

/* Active state for mobile menu */
.navbar-toggler:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

/* Ensure dropdown works on mobile */
@media (max-width: 991.98px) {
  .navbar-collapse {
    padding-top: 1rem;
  }

  .dropdown-menu {
    position: static !important;
    float: none;
    width: auto;
    margin-top: 0;
    background-color: transparent;
    border: 0;
    box-shadow: none;
  }

  .dropdown-item {
    color: rgba(255, 255, 255, 0.75) !important;
    padding: 0.5rem 1rem;
  }

  .dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white !important;
  }
}
</style>
