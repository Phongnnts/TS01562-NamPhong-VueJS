<template>
  <form @submit.prevent="submitForm" class="needs-validation" novalidate>
    <!-- Title -->
    <div class="mb-4">
      <label for="postTitle" class="form-label fw-semibold">Tiêu đề bài viết</label>
      <input
        v-model="postData.title"
        type="text"
        class="form-control form-control-lg"
        id="postTitle"
        placeholder="Nhập tiêu đề hấp dẫn..."
        required
      />
      <div class="form-text">Tiêu đề nên ngắn gọn, rõ ràng và hấp dẫn người đọc</div>
    </div>

    <!-- Content -->
    <div class="mb-4">
      <label for="postContent" class="form-label fw-semibold">Nội dung bài viết</label>
      <textarea
        v-model="postData.content"
        class="form-control"
        id="postContent"
        rows="12"
        placeholder="Viết nội dung của bạn ở đây..."
        required
      ></textarea>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="form-text">Số từ: {{ wordCount }} | Số ký tự: {{ charCount }}</div>
        <small class="text-muted">Hỗ trợ Markdown cơ bản</small>
      </div>
    </div>

    <!-- Image & Category -->
    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <label for="postImage" class="form-label fw-semibold">Ảnh đại diện (URL)</label>
        <input
          v-model="postData.image"
          type="url"
          class="form-control"
          id="postImage"
          placeholder="https://example.com/image.jpg"
        />
        <div class="form-text">URL ảnh minh họa cho bài viết</div>
      </div>
      <div class="col-md-6">
        <label for="postCategory" class="form-label fw-semibold">Danh mục</label>
        <select v-model="postData.category" class="form-select" id="postCategory">
          <option value="">Chọn danh mục</option>
          <option value="Frontend">Frontend Development</option>
          <option value="Backend">Backend Development</option>
          <option value="Mobile">Mobile Development</option>
          <option value="DevOps">DevOps & Cloud</option>
          <option value="Database">Database</option>
          <option value="AI/ML">AI & Machine Learning</option>
          <option value="Career">Career & Soft Skills</option>
          <option value="Other">Khác</option>
        </select>
      </div>
    </div>

    <!-- Status & Tags -->
    <div class="row g-3 mb-4" v-if="isEdit">
      <div class="col-md-6">
        <label for="postStatus" class="form-label fw-semibold">Trạng thái</label>
        <select v-model="postData.status" class="form-select" id="postStatus">
          <option value="draft">Bản nháp</option>
          <option value="published">Xuất bản</option>
          <option value="pending">Chờ duyệt</option>
        </select>
      </div>
    </div>

    <!-- Actions -->
    <div class="d-flex justify-content-between align-items-center pt-4 border-top">
      <div>
        <button type="button" class="btn btn-outline-secondary" @click="cancel">Hủy bỏ</button>
      </div>
      <div class="d-flex gap-3">
        <button v-if="isEdit" type="button" class="btn btn-outline-success" @click="saveDraft">
          <i class="bi bi-save me-2"></i>Lưu nháp
        </button>
        <button type="submit" class="btn btn-primary px-4" :disabled="!isValid">
          <i class="bi" :class="submitButtonIcon"></i>
          {{ submitButtonText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    default: () => ({}),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])
const router = useRouter()

// Reactive post data
const postData = reactive({
  title: '',
  content: '',
  image: '',
  category: '',
  status: 'draft',
})

// Computed properties
const wordCount = computed(() => {
  return postData.content.trim() ? postData.content.trim().split(/\s+/).length : 0
})

const charCount = computed(() => {
  return postData.content.length
})

const isValid = computed(() => {
  return postData.title.trim().length >= 5 && postData.content.trim().length >= 50
})

const submitButtonText = computed(() => {
  return props.isEdit ? 'Cập nhật bài viết' : 'Đăng bài viết'
})

const submitButtonIcon = computed(() => {
  return props.isEdit ? 'bi-check-circle' : 'bi-send-check'
})

// Watch for prop changes
watch(
  () => props.post,
  (newPost) => {
    if (newPost && Object.keys(newPost).length > 0) {
      Object.assign(postData, {
        title: newPost.title || '',
        content: newPost.content || '',
        image: newPost.image || '',
        category: newPost.category || '',
        status: newPost.status || 'draft',
      })
    }
  },
  { immediate: true },
)

// Methods
const submitForm = () => {
  if (!isValid.value) {
    showValidationError()
    return
  }

  emit('submit', {
    ...postData,
    title: postData.title.trim(),
    content: postData.content.trim(),
  })
}

const cancel = () => {
  if (confirm('Bạn có chắc muốn hủy? Các thay đổi chưa lưu sẽ bị mất.')) {
    emit('cancel')
    router.back()
  }
}

const saveDraft = () => {
  postData.status = 'draft'
  emit('submit', {
    ...postData,
    title: postData.title.trim(),
    content: postData.content.trim(),
  })
}

const showValidationError = () => {
  const form = document.querySelector('.needs-validation')
  form.classList.add('was-validated')
}

// Initialize validation on mount
onMounted(() => {
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      },
      false,
    )
  })
})
</script>

<style scoped>
.needs-validation .form-control:invalid,
.needs-validation .form-select:invalid {
  border-color: #dc3545;
}

.needs-validation .form-control:valid,
.needs-validation .form-select:valid {
  border-color: #198754;
}

.form-control-lg {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
