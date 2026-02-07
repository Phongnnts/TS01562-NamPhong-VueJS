<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!post" class="alert alert-danger">
      Bài viết không tồn tại hoặc đã bị xóa.
      <router-link to="/posts" class="alert-link">Quay lại danh sách</router-link>
    </div>

    <!-- Post Content -->
    <div v-else>
      <!-- Post Header -->
      <div class="mb-4">
        <h3 class="mb-3">{{ post.title }}</h3>
        <div class="text-muted mb-3">
          <i class="bi bi-person me-1"></i>{{ post.author }} <i class="bi bi-calendar ms-3 me-1"></i
          >{{ formatDate(post.createdAt) }} <i class="bi bi-eye ms-3 me-1"></i>{{ post.views }}
        </div>

        <!-- Image -->
        <img v-if="post.image" :src="post.image" class="img-fluid mb-3 rounded" alt="Post image" />

        <!-- Content -->
        <div class="mb-4">
          <p style="white-space: pre-line">{{ post.content }}</p>
        </div>

        <!-- Actions -->
        <div class="d-flex gap-2 mb-4">
          <button class="btn btn-outline-primary" @click="likePost">
            <i class="bi bi-heart me-2"></i>Thích ({{ post.likes }})
          </button>

          <template v-if="isAuthor">
            <router-link :to="`/edit/${post.id}`" class="btn btn-outline-warning">
              <i class="bi bi-pencil me-2"></i>Sửa
            </router-link>
            <button class="btn btn-outline-danger" @click="deletePost">
              <i class="bi bi-trash me-2"></i>Xóa
            </button>
          </template>
        </div>
      </div>

      <!-- Comments -->
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Bình luận ({{ comments.length }})</h5>
        </div>
        <div class="card-body">
          <!-- Add Comment -->
          <div v-if="user" class="mb-4">
            <textarea
              v-model="newComment"
              class="form-control mb-2"
              rows="3"
              placeholder="Viết bình luận của bạn..."
            ></textarea>
            <button class="btn btn-primary" @click="addComment" :disabled="!newComment.trim()">
              Gửi bình luận
            </button>
          </div>
          <div v-else class="alert alert-info mb-4">
            <router-link to="/login" class="alert-link">Đăng nhập</router-link> để bình luận
          </div>

          <!-- Comments List -->
          <div v-if="comments.length > 0">
            <div v-for="comment in comments" :key="comment.id" class="mb-3 pb-3 border-bottom">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <strong>{{ comment.authorName }}</strong>
                  <div class="text-muted small">
                    {{ formatDate(comment.createdAt) }}
                  </div>
                </div>
                <button
                  v-if="canDeleteComment(comment)"
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteComment(comment.id)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
              <p class="mb-0 mt-2">{{ comment.content }}</p>
            </div>
          </div>
          <div v-else class="text-muted text-center py-3">Chưa có bình luận nào</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostById, updatePost, deletePost as deletePostService } from '../services/post'
import {
  getCommentsByPost,
  createComment,
  deleteComment as deleteCommentService,
} from '../services/comment'
import { getCurrentUser } from '../services/auth'

const route = useRoute()
const router = useRouter()

const post = ref(null)
const loading = ref(true)
const user = ref(null)
const comments = ref([])
const newComment = ref('')

onMounted(() => {
  user.value = getCurrentUser()
  loadPost()
  loadComments()
})

// Load post
const loadPost = () => {
  const postId = parseInt(route.params.id)
  post.value = getPostById(postId)
  loading.value = false
}

// Load comments
const loadComments = () => {
  const postId = parseInt(route.params.id)
  comments.value = getCommentsByPost(postId)
}

// Computed
const isAuthor = computed(() => {
  return user.value && post.value && user.value.id === post.value.authorId
})

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('vi-VN')
}

const likePost = () => {
  if (!user.value) {
    router.push('/login')
    return
  }

  if (post.value) {
    post.value.likes = (post.value.likes || 0) + 1
    updatePost(post.value.id, { likes: post.value.likes })
  }
}

const deletePost = () => {
  if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
    const success = deletePostService(post.value.id)
    if (success) {
      router.push('/posts')
    }
  }
}

const addComment = async () => {
  if (!user.value) {
    router.push('/login')
    return
  }

  if (!newComment.value.trim()) return

  try {
    await createComment({
      postId: post.value.id,
      content: newComment.value.trim(),
    })

    newComment.value = ''
    loadComments()
  } catch (error) {
    console.error('Error adding comment:', error)
  }
}

const canDeleteComment = (comment) => {
  return user.value && (user.value.id === comment.authorId || user.value.role === 'admin')
}

const deleteComment = async (commentId) => {
  if (confirm('Bạn có chắc muốn xóa bình luận này?')) {
    const success = await deleteCommentService(commentId)
    if (success) {
      loadComments()
    }
  }
}
</script>
