<template>
  <div class="register-page">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card border-0 shadow-lg">
          <div class="card-body p-5">
            <!-- Header -->
            <div class="text-center mb-5">
              <h2 class="fw-bold text-primary mb-3">
                <i class="bi bi-journal-text me-2"></i>BlogVue
              </h2>
              <h4 class="mb-2">Đăng ký tài khoản mới</h4>
              <p class="text-muted">Tham gia cộng đồng BlogVue ngay hôm nay</p>
            </div>

            <!-- Progress Steps -->
            <div class="mb-5">
              <div class="d-flex justify-content-between align-items-center">
                <div class="step active">
                  <div class="step-circle">1</div>
                  <span class="step-label">Thông tin</span>
                </div>
                <div class="step-line"></div>
                <div class="step">
                  <div class="step-circle">2</div>
                  <span class="step-label">Xác nhận</span>
                </div>
              </div>
            </div>

            <!-- Registration Form -->
            <form @submit.prevent="handleRegister">
              <!-- Name -->
              <div class="mb-4">
                <label for="name" class="form-label fw-semibold">Họ và tên</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-person"></i>
                  </span>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
              </div>

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
                <small class="text-muted">Chúng tôi sẽ không chia sẻ email của bạn</small>
              </div>

              <!-- Passwords -->
              <div class="row g-3 mb-4">
                <div class="col-md-6">
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
                      @input="checkPasswordStrength"
                    />
                  </div>
                  <!-- Password Strength -->
                  <div v-if="passwordStrength > 0" class="mt-2">
                    <div class="progress" style="height: 4px">
                      <div
                        class="progress-bar"
                        :class="passwordStrengthClass"
                        :style="{ width: passwordStrength + '%' }"
                      ></div>
                    </div>
                    <small :class="passwordStrengthTextClass">
                      {{ passwordStrengthText }}
                    </small>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="confirmPassword" class="form-label fw-semibold"
                    >Xác nhận mật khẩu</label
                  >
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-lock-fill"></i>
                    </span>
                    <input
                      v-model="form.confirmPassword"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      id="confirmPassword"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div v-if="passwordMismatch" class="mt-1">
                    <small class="text-danger">
                      <i class="bi bi-exclamation-triangle me-1"></i>
                      Mật khẩu không khớp
                    </small>
                  </div>
                </div>
              </div>

              <!-- Show Password -->
              <div class="mb-4">
                <div class="form-check">
                  <input
                    v-model="showPassword"
                    class="form-check-input"
                    type="checkbox"
                    id="showPassword"
                  />
                  <label class="form-check-label" for="showPassword"> Hiển thị mật khẩu </label>
                </div>
              </div>

              <!-- Terms -->
              <div class="mb-5">
                <div class="form-check">
                  <input
                    v-model="form.acceptTerms"
                    class="form-check-input"
                    type="checkbox"
                    id="terms"
                    required
                  />
                  <label class="form-check-label" for="terms">
                    Tôi đồng ý với
                    <a href="#" class="text-decoration-none">Điều khoản dịch vụ</a>
                    và
                    <a href="#" class="text-decoration-none">Chính sách bảo mật</a>
                  </label>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="alert alert-danger alert-dismissible fade show mb-4">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ error }}
                <button type="button" class="btn-close" @click="error = ''"></button>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="btn btn-primary w-100 py-2 mb-4"
                :disabled="loading || !form.acceptTerms || passwordMismatch"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="bi bi-person-plus me-2"></i>
                Đăng ký tài khoản
              </button>

              <!-- Login Link -->
              <div class="text-center">
                <p class="text-muted mb-0">
                  Đã có tài khoản?
                  <router-link to="/login" class="text-decoration-none fw-semibold">
                    Đăng nhập ngay
                  </router-link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="text-center mt-4">
          <p class="text-muted small">
            Bằng việc đăng ký, bạn đồng ý với các điều khoản của chúng tôi
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/auth'

const router = useRouter()

// Form data
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

// UI state
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

// Password strength
const passwordStrength = ref(0)
const passwordStrengthText = ref('')
const passwordStrengthClass = ref('')
const passwordStrengthTextClass = ref('')

// Computed properties
const passwordMismatch = computed(() => {
  return form.password && form.confirmPassword && form.password !== form.confirmPassword
})

// Password strength checker
const checkPasswordStrength = () => {
  const password = form.password
  let strength = 0

  if (password.length >= 8) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  if (/[^A-Za-z0-9]/.test(password)) strength += 25

  passwordStrength.value = strength

  // Set strength text and color
  if (strength <= 25) {
    passwordStrengthText.value = 'Yếu'
    passwordStrengthClass.value = 'bg-danger'
    passwordStrengthTextClass.value = 'text-danger'
  } else if (strength <= 50) {
    passwordStrengthText.value = 'Trung bình'
    passwordStrengthClass.value = 'bg-warning'
    passwordStrengthTextClass.value = 'text-warning'
  } else if (strength <= 75) {
    passwordStrengthText.value = 'Mạnh'
    passwordStrengthClass.value = 'bg-info'
    passwordStrengthTextClass.value = 'text-info'
  } else {
    passwordStrengthText.value = 'Rất mạnh'
    passwordStrengthClass.value = 'bg-success'
    passwordStrengthTextClass.value = 'text-success'
  }
}

// Handle registration
const handleRegister = async () => {
  if (loading.value) return

  // Reset error
  error.value = ''

  // Validate form
  if (!form.acceptTerms) {
    error.value = 'Vui lòng đồng ý với điều khoản dịch vụ'
    return
  }

  if (passwordMismatch.value) {
    error.value = 'Mật khẩu xác nhận không khớp'
    return
  }

  if (form.password.length < 6) {
    error.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    return
  }

  loading.value = true

  try {
    // Prepare user data
    const userData = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    }

    // Call register service
    await register(userData)

    // Show success message
    alert('Đăng ký thành công! Vui lòng đăng nhập.')

    // Redirect to login
    router.push('/login')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: calc(100vh - 300px);
  display: flex;
  align-items: center;
}

.card {
  border-radius: 1rem;
}

/* Progress Steps */
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e9ecef;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.step.active .step-circle {
  background-color: #0d6efd;
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: #6c757d;
}

.step.active .step-label {
  color: #0d6efd;
  font-weight: 500;
}

.step-line {
  flex: 1;
  height: 2px;
  background-color: #e9ecef;
  margin: 0 1rem;
  margin-top: 20px;
}

/* Form Styles */
.input-group-text {
  background-color: #f8f9fa;
}

.input-group .form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
}

.progress {
  background-color: #e9ecef;
}
</style>
