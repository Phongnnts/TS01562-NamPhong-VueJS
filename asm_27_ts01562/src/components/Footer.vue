<template>
  <footer class="bg-dark text-white py-5 mt-auto">
    <div class="container">
      <div class="row">
        <!-- Company Info -->
        <div class="col-lg-4 mb-4 mb-lg-0">
          <router-link to="/" class="text-decoration-none">
            <h3 class="fw-bold text-white mb-3">
              <i class="bi bi-pen me-2"></i>Blog<span class="text-primary">Hub</span>
            </h3>
          </router-link>
          <p class="text-light opacity-75 mb-4">
            Nền tảng blog công nghệ hàng đầu cho cộng đồng developer Việt Nam. Chia sẻ kiến thức,
            kết nối và cùng phát triển.
          </p>
          <div class="d-flex gap-3">
            <a href="#" class="text-white opacity-75 hover-opacity-100">
              <i class="bi bi-facebook fs-5"></i>
            </a>
            <a href="#" class="text-white opacity-75 hover-opacity-100">
              <i class="bi bi-twitter fs-5"></i>
            </a>
            <a href="#" class="text-white opacity-75 hover-opacity-100">
              <i class="bi bi-github fs-5"></i>
            </a>
            <a href="#" class="text-white opacity-75 hover-opacity-100">
              <i class="bi bi-youtube fs-5"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
          <h5 class="fw-bold mb-4">Liên kết nhanh</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link
                to="/"
                class="text-white opacity-75 text-decoration-none hover-opacity-100"
              >
                Trang chủ
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/posts"
                class="text-white opacity-75 text-decoration-none hover-opacity-100"
              >
                Bài viết
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/categories"
                class="text-white opacity-75 text-decoration-none hover-opacity-100"
              >
                Danh mục
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/about"
                class="text-white opacity-75 text-decoration-none hover-opacity-100"
              >
                Giới thiệu
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="col-lg-3 col-md-4 mb-4 mb-md-0">
          <h5 class="fw-bold mb-4">Tài nguyên</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="#" class="text-white opacity-75 text-decoration-none hover-opacity-100">
                Hướng dẫn sử dụng
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-white opacity-75 text-decoration-none hover-opacity-100">
                API Documentation
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-white opacity-75 text-decoration-none hover-opacity-100">
                Chính sách bảo mật
              </a>
            </li>
            <li class="mb-2">
              <a href="#" class="text-white opacity-75 text-decoration-none hover-opacity-100">
                Điều khoản dịch vụ
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-lg-3 col-md-4">
          <h5 class="fw-bold mb-4">Liên hệ</h5>
          <ul class="list-unstyled">
            <li class="mb-3 d-flex align-items-start">
              <i class="bi bi-envelope me-2 mt-1"></i>
              <span class="opacity-75">support@bloghub.vn</span>
            </li>
            <li class="mb-3 d-flex align-items-start">
              <i class="bi bi-telephone me-2 mt-1"></i>
              <span class="opacity-75">(024) 7300 8866</span>
            </li>
            <li class="d-flex align-items-start">
              <i class="bi bi-geo-alt me-2 mt-1"></i>
              <span class="opacity-75">Số 8, Tôn Thất Thuyết, Hà Nội</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <hr class="my-5 opacity-25" />
      <div class="row">
        <div class="col-md-6">
          <p class="mb-0 opacity-75">© {{ currentYear }} BlogHub. Bảo lưu mọi quyền.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="mb-0 opacity-75">
            Made with <i class="bi bi-heart-fill text-danger"></i> for Vietnamese Developers
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<style scoped>
.hover-opacity-100:hover {
  opacity: 1 !important;
  text-decoration: underline;
}

footer a {
  transition: opacity 0.2s ease;
}

footer a:hover {
  opacity: 1;
}
</style>
