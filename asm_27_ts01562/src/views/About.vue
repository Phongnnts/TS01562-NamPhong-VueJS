<template>
  <div class="about-page">
    <!-- Hero Section -->
    <div class="hero-section bg-light rounded-3 p-5 mb-5">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold mb-3">Trang Quản Lý Blog</h1>
          <p class="lead mb-4">
            Đây là dự án blog đơn giản được xây dựng với VueJS 3 và Bootstrap 5 của Fpt Polytechnic
          </p>
          <div class="d-flex gap-3">
            <span class="badge bg-primary fs-6"> <i class="bi bi-vue me-1"></i>VueJS 3 </span>
            <span class="badge bg-info fs-6">
              <i class="bi bi-bootstrap me-1"></i>Bootstrap 5
            </span>
            <span class="badge bg-success fs-6">
              <i class="bi bi-javascript me-1"></i>JavaScript
            </span>
          </div>
        </div>
        <div class="col-lg-6 text-center mt-4 mt-lg-0">
          <img
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="About"
            class="img-fluid rounded shadow-lg"
          />
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="mb-5">
      <h3 class="fw-bold text-center mb-5">Tính năng chính</h3>
      <div class="row g-4">
        <div class="col-md-4" v-for="feature in features" :key="feature.id">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center p-4">
              <div class="feature-icon mx-auto mb-3">
                <i :class="feature.icon" class="fs-1 text-primary"></i>
              </div>
              <h5 class="fw-bold mb-3">{{ feature.title }}</h5>
              <p class="text-muted mb-0">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Features
const features = [
  {
    id: 1,
    icon: 'bi bi-person-plus',
    title: 'Đăng ký & Đăng nhập',
    description: 'Hệ thống xác thực đơn giản với phân quyền admin/user',
  },
  {
    id: 2,
    icon: 'bi bi-file-text',
    title: 'Quản lý bài viết',
    description: 'Tạo, chỉnh sửa, xóa bài viết với giao diện thân thiện',
  },
  {
    id: 3,
    icon: 'bi bi-chat-dots',
    title: 'Bình luận',
    description: 'Thảo luận và trao đổi ý kiến trên từng bài viết',
  },
  {
    id: 4,
    icon: 'bi bi-person-circle',
    title: 'Hồ sơ cá nhân',
    description: 'Quản lý thông tin và ảnh đại diện cá nhân',
  },
]

// Tech Stack
const techStack = [
  {
    id: 1,
    name: 'VueJS 3',
    icon: 'bi bi-vue',
    color: '#42b883',
  },
  {
    id: 2,
    name: 'Bootstrap 5',
    icon: 'bi bi-bootstrap',
    color: '#7952b3',
  },
  {
    id: 3,
    name: 'JavaScript',
    icon: 'bi bi-javascript',
    color: '#f7df1e',
  },
  {
    id: 4,
    name: 'Vue Router',
    icon: 'bi bi-router',
    color: '#4fc08d',
  },
]
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.feature-icon {
  width: 70px;
  height: 70px;
  background: rgba(13, 110, 253, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  border-radius: 0.75rem;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
