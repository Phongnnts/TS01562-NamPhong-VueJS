<template>
  <div class="login-page">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card border-0 shadow-lg">
          <div class="card-body p-5">
            <!-- Header -->
            <div class="text-center mb-5">
              <h2 class="fw-bold text-primary mb-3">
                <i class="bi bi-journal-text me-2"></i>BlogVue
              </h2>
              <h4 class="mb-2">Đăng nhập tài khoản</h4>
              <p class="text-muted">Đăng nhập để bắt đầu sử dụng BlogVue</p>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin">
              <!-- Email -->
              <div class="mb-4">
                <label for="email" class="form-label fw-semibold">Email</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="mb-4">
                <label for="password" class="form-label fw-semibold">Mật khẩu</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    id="password"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    class="input-group-text"
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-check">
                  <input
                    v-model="form.remember"
                    class="form-check-input"
                    type="checkbox"
                    id="remember"
                  />
                  <label class="form-check-label" for="remember"> Ghi nhớ đăng nhập </label>
                </div>
                <a href="#" class="text-decoration-none small"> Quên mật khẩu? </a>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="alert alert-danger alert-dismissible fade show mb-4">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ error }}
                <button type="button" class="btn-close" @click="error = ''"></button>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary w-100 py-2 mb-4" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="bi bi-box-arrow-in-right me-2"></i>
                Đăng nhập
              </button>

              <!-- Divider -->
              <div class="position-relative text-center my-4">
                <hr />
                <span
                  class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted"
                >
                  hoặc
                </span>
              </div>

              <!-- Demo Accounts -->
              <div class="mb-4">
                <p class="text-muted small mb-2">Tài khoản demo:</p>
                <div class="d-flex gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-dark btn-sm flex-fill"
                    @click="useDemo('admin')"
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm flex-fill"
                    @click="useDemo('user')"
                  >
                    User
                  </button>
                </div>
              </div>

              <!-- Register Link -->
              <div class="text-center">
                <p class="text-muted mb-0">
                  Chưa có tài khoản?
                  <router-link to="/register" class="text-decoration-none fw-semibold">
                    Đăng ký ngay
                  </router-link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <!-- Terms -->
        <div class="text-center mt-4">
          <p class="text-muted small">
            Bằng việc đăng nhập, bạn đồng ý với
            <a href="#" class="text-decoration-none">Điều khoản dịch vụ</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/auth'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Validate
    if (!form.email || !form.password) {
      throw new Error('Vui lòng nhập đầy đủ thông tin')
    }

    // Login
    await login(form.email, form.password)

    // Dispatch event
    window.dispatchEvent(new Event('auth-state-changed'))

    // Redirect
    router.push('/')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const useDemo = (type) => {
  if (type === 'admin') {
    form.email = 'admin@example.com'
    form.password = 'admin123'
  } else {
    form.email = 'user@example.com'
    form.password = 'user123'
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 300px);
  display: flex;
  align-items: center;
}

.card {
  border-radius: 1rem;
}

.input-group-text {
  background-color: #f8f9fa;
}

.input-group .form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
}
</style>
