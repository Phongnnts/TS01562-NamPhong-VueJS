<template>
  <div>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="!user" class="alert alert-info">
      Vui lòng <router-link to="/login" class="alert-link">đăng nhập</router-link> để xem hồ sơ
    </div>

    <div v-else>
      <h3 class="mb-4">Hồ sơ cá nhân</h3>

      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body text-center">
              <img :src="user.avatar" class="rounded-circle mb-3" width="100" height="100" />
              <h5>{{ user.name }}</h5>
              <p class="text-muted">{{ user.email }}</p>
              <span class="badge" :class="user.role === 'admin' ? 'bg-danger' : 'bg-primary'">
                {{ user.role === 'admin' ? 'Quản trị viên' : 'Thành viên' }}
              </span>
              <div class="mt-3">
                <small class="text-muted"> Tham gia từ {{ formatDate(user.createdAt) }} </small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="name" class="form-label">Họ và tên</label>
                  <input v-model="form.name" type="text" class="form-control" id="name" required />
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    id="email"
                    required
                    readonly
                  />
                  <small class="text-muted">Email không thể thay đổi</small>
                </div>

                <div class="mb-3">
                  <label for="avatar" class="form-label">URL ảnh đại diện</label>
                  <input
                    v-model="form.avatar"
                    type="text"
                    class="form-control"
                    id="avatar"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <h5 class="mt-4 mb-3">Đổi mật khẩu</h5>
                <div class="mb-3">
                  <label for="currentPassword" class="form-label">Mật khẩu hiện tại</label>
                  <input
                    v-model="form.currentPassword"
                    type="password"
                    class="form-control"
                    id="currentPassword"
                  />
                </div>
                <div class="mb-3">
                  <label for="newPassword" class="form-label">Mật khẩu mới</label>
                  <input
                    v-model="form.newPassword"
                    type="password"
                    class="form-control"
                    id="newPassword"
                  />
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Xác nhận mật khẩu mới</label>
                  <input
                    v-model="form.confirmPassword"
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                  />
                </div>

                <div v-if="error" class="alert alert-danger">
                  {{ error }}
                </div>

                <div v-if="success" class="alert alert-success">
                  {{ success }}
                </div>

                <button type="submit" class="btn btn-primary" :disabled="saving">
                  <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
                  Lưu thay đổi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getCurrentUser, updateProfile } from '../services/auth'

const user = ref(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const success = ref('')

const form = reactive({
  name: '',
  email: '',
  avatar: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

onMounted(() => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    user.value = currentUser
    form.name = currentUser.name
    form.email = currentUser.email
    form.avatar = currentUser.avatar || ''
  }
  loading.value = false
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const handleSubmit = async () => {
  // Validate passwords
  if (form.newPassword || form.confirmPassword) {
    if (form.newPassword !== form.confirmPassword) {
      error.value = 'Mật khẩu mới không khớp'
      return
    }
    if (form.newPassword.length < 6) {
      error.value = 'Mật khẩu phải có ít nhất 6 ký tự'
      return
    }
  }

  saving.value = true
  error.value = ''
  success.value = ''

  try {
    // Prepare update data
    const updateData = {
      name: form.name.trim(),
      avatar: form.avatar.trim() || null,
    }

    // Add password if provided
    if (form.newPassword) {
      updateData.password = form.newPassword
    }

    // Update profile
    await updateProfile(updateData)

    // Update local user data
    user.value = getCurrentUser()

    success.value = 'Cập nhật thông tin thành công!'

    // Clear password fields
    form.currentPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}
</script>
