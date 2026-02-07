<template>
  <section class="section">
    <div class="container-narrow">
      <h2 class="mb-4">✍️ Viết bài mới</h2>

      <!-- Title -->
      <input
        v-model="title"
        class="form-control form-control-lg mb-3"
        placeholder="Tiêu đề bài viết"
      />

      <!-- Content -->
      <textarea
        v-model="content"
        rows="16"
        class="form-control"
        placeholder="Bắt đầu viết nội dung của bạn tại đây..."
      ></textarea>

      <!-- Actions -->
      <div class="d-flex justify-content-between align-items-center mt-4">
        <span class="text-muted">
          {{ previewInfo }}
        </span>

        <button class="btn btn-primary" :disabled="!canPublish" @click="publish">Xuất bản</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { addPost } from '../services/post'
import { getCurrentUser } from '../services/auth'

const router = useRouter()
const user = getCurrentUser()

const title = ref('')
const content = ref('')

const canPublish = computed(() => {
  return title.value.trim().length >= 5 && content.value.trim().length >= 50
})

const previewInfo = computed(() => {
  const words = content.value.trim() ? content.value.trim().split(/\s+/).length : 0
  return `Số từ: ${words} • Tác giả: ${user.name}`
})

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

const publish = () => {
  if (!canPublish.value) return

  addPost({
    id: Date.now(),
    title: title.value.trim(),
    slug: slugify(title.value),
    content: content.value.trim(),
    authorId: user.id,
    authorName: user.name,
    createdAt: new Date().toLocaleString(),
  })

  router.push('/')
}
</script>
