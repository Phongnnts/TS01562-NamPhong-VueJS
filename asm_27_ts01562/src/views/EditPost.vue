<template>
  <div>
    <h3 class="mb-4">Chỉnh sửa bài viết</h3>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="!post" class="alert alert-danger">
      Bài viết không tồn tại
      <router-link to="/posts" class="alert-link">Quay lại</router-link>
    </div>

    <div v-else class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="title" class="form-label">Tiêu đề</label>
            <input
              v-model="form.title"
              type="text"
              class="form-control"
              id="title"
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </div>

          <div class="mb-3">
            <label for="content" class="form-label">Nội dung</label>
            <textarea
              v-model="form.content"
              class="form-control"
              id="content"
              rows="8"
              placeholder="Nhập nội dung bài viết"
              required
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="image" class="form-label">URL hình ảnh</label>
            <input
              v-model="form.image"
              type="text"
              class="form-control"
              id="image"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <div class="d-flex justify-content-between">
            <router-link to="/posts" class="btn btn-secondary">Hủy bỏ</router-link>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostById, updatePost } from '../services/post'
import { getCurrentUser } from '../services/auth'

const route = useRoute()
const router = useRouter()

const post = ref(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const form = reactive({
  title: '',
  content: '',
  image: '',
})

onMounted(() => {
  const user = getCurrentUser()
  if (!user) {
    router.push('/login')
    return
  }

  const postId = parseInt(route.params.id)
  const foundPost = getPostById(postId)

  if (!foundPost) {
    loading.value = false
    return
  }

  // Check permission
  if (user.id !== foundPost.authorId && user.role !== 'admin') {
    router.push('/posts')
    return
  }

  post.value = foundPost
  form.title = foundPost.title
  form.content = foundPost.content
  form.image = foundPost.image || ''

  loading.value = false
})

const handleSubmit = async () => {
  if (!form.title.trim() || !form.content.trim()) {
    error.value = 'Vui lòng nhập tiêu đề và nội dung'
    return
  }

  saving.value = true
  error.value = ''

  try {
    await updatePost(post.value.id, form)
    router.push(`/post/${post.value.id}`)
  } catch (err) {
    error.value = err.message || 'Có lỗi xảy ra'
  } finally {
    saving.value = false
  }
}
</script>
