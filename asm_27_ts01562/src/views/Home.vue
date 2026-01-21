<template>
  <!-- ================= BANNER ================= -->
  <img src="/images/banner.jpg" class="w-100" style="background-size: cover; height: 300px" />

  <!-- ================= CONTENT ================= -->
  <div class="container my-4">
    <div class="row g-4">
      <!-- ===== LEFT ===== -->
      <aside class="col-lg-3">
        <h5 class="text-info mb-3">Về tôi</h5>

        <div class="card text-center mb-3">
          <div class="card-body">
            <img src="/images/avatar.png" class="rounded-circle mb-3" width="120" />
            <p class="fw-semibold mb-1">Giới thiệu bản thân</p>
            <small class="text-muted">Chào mừng bạn đến với blog</small>
          </div>
        </div>

        <div class="d-flex justify-content-between mb-2">
          <span class="text-info fw-semibold">Đọc nhiều</span>
          <span class="text-info fw-semibold">Xem nhiều</span>
        </div>

        <div class="card p-2">
          <div v-for="p in popularPosts" :key="p.id" class="d-flex gap-2 mb-2">
            <img :src="p.image" width="60" class="rounded" />
            <div>
              <small class="fw-semibold">{{ p.title }}</small
              ><br />
              <small class="text-muted"> <i class="bi bi-eye"></i> {{ p.views }} </small>
            </div>
          </div>
        </div>
      </aside>

      <!-- ===== CENTER BLOG ===== -->
      <main class="col-lg-6">
        <h5 class="text-info mb-3">Blog của tôi</h5>

        <div v-for="post in posts" :key="post.id" class="card mb-3">
          <div class="row g-0">
            <div class="col-md-5">
              <img :src="post.image" class="img-fluid h-100" style="object-fit: cover" />
            </div>
            <div class="col-md-7">
              ''
              <div class="card-body">
                <h6 class="fw-semibold">{{ post.title }}</h6>
                <p class="small text-muted">{{ post.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <router-link to="/posts" class="btn btn-info text-white px-4"> Xem thêm </router-link>
        </div>
      </main>

      <!-- ===== RIGHT ===== -->
      <aside class="col-lg-3">
        <h5 class="text-info mb-3">Bài nổi bật</h5>
        <ul class="list-group">
          <li v-for="p in featuredPosts" :key="p.id" class="list-group-item d-flex gap-2">
            <img :src="p.image" width="80" class="rounded" />
            <div>
              <small class="fw-semibold">{{ p.title }}</small
              ><br />
              <small class="text-muted"> <i class="bi bi-eye"></i> {{ p.views }} </small>
            </div>
          </li>
        </ul>
      </aside>
    </div>

    <!-- ===== VIDEO ===== -->
    <h5 class="text-info text-center mt-5">VIDEO - ĐỪNG BỎ LỠ</h5>

    <div class="row row-cols-1 row-cols-md-4 g-3">
      <div v-for="v in videos" :key="v.id" class="col">
        <div class="card">
          <img :src="v.image" class="img-fluid" />
          <div class="card-body">
            <small class="fw-semibold">{{ v.title }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-3">
      <button class="btn btn-info text-white px-4">Xem thêm</button>
    </div>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    title: 'Phương pháp tập Pilates giúp phục hồi cột sống',
    desc: 'Pilates giúp duy trì vóc dáng và phục hồi chấn thương hiệu quả.',
    image: '/images/post1.jpg',
  },
]

const popularPosts = [
  { id: 1, title: 'Biết ăn dỗi, đời sẽ…', views: 30, image: '/images/post1.jpg' },
  { id: 2, title: '10 công dụng bất ngờ…', views: 28, image: '/images/post2.jpg' },
]

const featuredPosts = popularPosts

const videos = [
  { id: 1, title: 'Đường đến thành công', image: '/images/video1.jpg' },
  { id: 2, title: 'Những ngày cuối năm', image: '/images/video2.jpg' },
  { id: 3, title: 'Ba người thầy', image: '/images/video3.jpg' },
]
</script>
