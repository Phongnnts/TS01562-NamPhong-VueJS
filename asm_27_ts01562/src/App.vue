<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
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
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Content -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Left Menu -->
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active" exact>
                <i class="bi bi-house-door me-1"></i>Trang chủ
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/posts" class="nav-link" active-class="active">
                <i class="bi bi-file-text me-1"></i>Bài viết
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" active-class="active">
                <i class="bi bi-info-circle me-1"></i>Giới thiệu
              </router-link>
            </li>
          </ul>

          <!-- Right Menu -->
          <div class="d-flex align-items-center">
            <!-- Create Post Button -->
            <router-link v-if="user" to="/create" class="btn btn-light btn-sm me-3">
              <i class="bi bi-pencil-square me-1"></i>Viết bài
            </router-link>

            <!-- Auth Section -->
            <div v-if="!user">
              <router-link to="/login" class="btn btn-outline-light btn-sm me-2">
                <i class="bi bi-box-arrow-in-right me-1"></i>Đăng nhập
              </router-link>
              <router-link to="/register" class="btn btn-light btn-sm">
                <i class="bi bi-person-plus me-1"></i>Đăng ký
              </router-link>
            </div>

            <!-- User Dropdown -->
            <div v-else class="dropdown">
              <button
                class="btn btn-link text-white text-decoration-none dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
              >
                <img :src="user.avatar" class="rounded-circle me-2" width="32" height="32" />
                <span class="d-none d-md-inline">{{ user.name }}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <i class="bi bi-person me-2"></i>Hồ sơ cá nhân
                  </router-link>
                </li>
                <li v-if="user.role === 'admin'">
                  <router-link to="/admin" class="dropdown-item">
                    <i class="bi bi-shield me-2"></i>Quản trị
                  </router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button class="dropdown-item text-danger" @click="logout">
                    <i class="bi bi-box-arrow-right me-2"></i>Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container my-4">
      <router-view />
    </main>

    <!-- Footer -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, logout as logoutUser } from './services/auth'

const router = useRouter()
const user = ref(null)

onMounted(() => {
  updateUser()
  window.addEventListener('auth-state-changed', updateUser)
})

const updateUser = () => {
  user.value = getCurrentUser()
}

const logout = () => {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    logoutUser()
    user.value = null
    window.dispatchEvent(new Event('auth-state-changed'))
    router.push('/')
  }
}
</script>

<style scoped>
.navbar {
  padding: 0.75rem 0;
}

.nav-link {
  padding: 0.5rem 1rem !important;
  border-radius: 0.375rem;
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.dropdown-toggle::after {
  margin-left: 0.5rem;
}

main {
  min-height: calc(100vh - 200px);
}

footer {
  margin-top: auto;
}
</style>
