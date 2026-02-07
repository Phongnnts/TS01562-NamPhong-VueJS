<template>
  <div class="comments-section mt-5">
    <!-- Comment Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="fw-bold mb-0">
        <i class="bi bi-chat-left-text me-2"></i>
        Bình luận <span class="badge bg-primary rounded-pill">{{ comments.length }}</span>
      </h5>
      <button
        v-if="comments.length > 0"
        class="btn btn-sm btn-outline-primary"
        @click="scrollToCommentForm"
      >
        <i class="bi bi-pencil-square me-1"></i>Viết bình luận
      </button>
    </div>

    <!-- Comment Form -->
    <div v-if="user" class="card mb-4 border-primary" id="commentForm">
      <div class="card-body">
        <div class="d-flex align-items-start mb-3">
          <div
            class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
            style="width: 40px; height: 40px"
          >
            {{ getUserInitials }}
          </div>
          <div class="flex-grow-1">
            <strong>{{ user.name }}</strong>
            <p class="text-muted small mb-0">
              Đang bình luận với tư cách
              {{ user.role === 'admin' ? 'quản trị viên' : 'thành viên' }}
            </p>
          </div>
        </div>

        <form @submit.prevent="submitComment">
          <div class="mb-3">
            <textarea
              v-model="newComment.content"
              class="form-control"
              rows="3"
              placeholder="Viết bình luận của bạn ở đây..."
              :maxlength="maxCommentLength"
              required
            ></textarea>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <small class="text-muted">
                {{ newComment.content.length }}/{{ maxCommentLength }} ký tự
              </small>
              <small class="text-muted">
                <i class="bi bi-info-circle me-1"></i>
                Bình luận sẽ được hiển thị công khai
              </small>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary" :disabled="!isCommentValid">
              <i class="bi bi-send me-2"></i>
              Gửi bình luận
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Login Prompt -->
    <div v-else class="alert alert-info mb-4">
      <div class="d-flex align-items-center">
        <i class="bi bi-info-circle fs-4 me-3"></i>
        <div>
          <p class="mb-1">Vui lòng đăng nhập để tham gia bình luận</p>
          <router-link to="/login" class="btn btn-sm btn-primary me-2">
            <i class="bi bi-box-arrow-in-right me-1"></i>Đăng nhập
          </router-link>
          <router-link to="/register" class="btn btn-sm btn-outline-primary">
            <i class="bi bi-person-plus me-1"></i>Đăng ký
          </router-link>
        </div>
      </div>
    </div>

    <!-- Comments List -->
    <div v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="card mb-3">
        <div class="card-body">
          <div class="d-flex align-items-start mb-2">
            <div
              class="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
              style="width: 36px; height: 36px"
            >
              {{ getInitials(comment.authorName) }}
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <strong>{{ comment.authorName }}</strong>
                  <span v-if="comment.authorId === postAuthorId" class="badge bg-primary ms-2"
                    >Tác giả</span
                  >
                  <div class="text-muted small">
                    <i class="bi bi-clock me-1"></i>
                    {{ formatDate(comment.createdAt) }}
                    <span v-if="comment.updatedAt !== comment.createdAt" class="ms-2">
                      <i class="bi bi-pencil me-1"></i>Đã chỉnh sửa
                    </span>
                  </div>
                </div>
                <div v-if="canDeleteComment(comment)" class="dropdown">
                  <button
                    class="btn btn-link text-muted p-0"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i class="bi bi-three-dots"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                    <li>
                      <button class="dropdown-item text-danger" @click="deleteComment(comment.id)">
                        <i class="bi bi-trash me-2"></i>Xóa bình luận
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p class="mb-0">{{ comment.content }}</p>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-5">
      <i class="bi bi-chat-dots display-1 text-muted mb-3"></i>
      <h5>Chưa có bình luận nào</h5>
      <p class="text-muted mb-4">Hãy là người đầu tiên chia sẻ suy nghĩ của bạn!</p>
      <button v-if="user" class="btn btn-primary" @click="scrollToCommentForm">
        <i class="bi bi-pencil-square me-2"></i>Viết bình luận đầu tiên
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { getCurrentUser } from '../services/auth'
import { createComment, deleteComment as deleteCommentService } from '../services/comment'

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
  comments: {
    type: Array,
    default: () => [],
  },
  postAuthorId: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['refresh', 'comment-added'])

// Reactive data
const user = ref(null)
const newComment = reactive({
  content: '',
})

// Constants
const maxCommentLength = 1000

// Computed properties
const getUserInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const isCommentValid = computed(() => {
  return (
    newComment.content.trim().length >= 3 && newComment.content.trim().length <= maxCommentLength
  )
})

// Lifecycle
onMounted(() => {
  user.value = getCurrentUser()
})

// Methods
const getInitials = (name) => {
  if (!name) return 'A'
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Vừa xong'
  if (diffMins < 60) return `${diffMins} phút trước`
  if (diffHours < 24) return `${diffHours} giờ trước`
  if (diffDays < 7) return `${diffDays} ngày trước`

  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const canDeleteComment = (comment) => {
  if (!user.value) return false
  return user.value.id === comment.authorId || user.value.role === 'admin'
}

const submitComment = async () => {
  if (!isCommentValid.value) return

  try {
    await createComment({
      postId: props.postId,
      content: newComment.content.trim(),
      authorId: user.value.id,
      authorName: user.value.name,
    })

    // Clear form
    newComment.content = ''

    // Emit events
    emit('refresh')
    emit('comment-added')

    // Show success message
    showToast('Bình luận đã được đăng thành công!', 'success')
  } catch (error) {
    showToast('Có lỗi xảy ra khi đăng bình luận. Vui lòng thử lại.', 'danger')
  }
}

const deleteComment = async (commentId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return

  try {
    const success = await deleteCommentService(commentId)
    if (success) {
      emit('refresh')
      showToast('Bình luận đã được xóa!', 'success')
    }
  } catch (error) {
    showToast('Có lỗi xảy ra khi xóa bình luận.', 'danger')
  }
}

const scrollToCommentForm = () => {
  const form = document.getElementById('commentForm')
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' })
    // Focus on textarea if user is logged in
    if (user.value) {
      const textarea = form.querySelector('textarea')
      if (textarea) {
        setTimeout(() => textarea.focus(), 300)
      }
    }
  }
}

const showToast = (message, type = 'info') => {
  // Simple alert for now, can be replaced with a proper toast component
  alert(message)
}
</script>

<style scoped>
.comments-section {
  border-top: 1px solid #dee2e6;
  padding-top: 2rem;
}

.card {
  border: 1px solid #dee2e6;
}

.border-primary {
  border-color: #0d6efd !important;
}

.dropdown-toggle::after {
  display: none;
}
</style>
