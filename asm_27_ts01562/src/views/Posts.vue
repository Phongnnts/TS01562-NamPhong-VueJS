<template>
  <div class="container my-5">
    <!-- TITLE -->
    <h4 class="text-info fw-semibold mb-4"><i class="bi bi-list"></i> Danh sách bài viết</h4>

    <!-- POSTS -->
    <div class="row g-4">
      <div v-for="p in posts" :key="p.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <!-- IMAGE -->
          <img :src="p.image" class="card-img-top" style="height: 180px; object-fit: cover" />

          <!-- BODY -->
          <div class="card-body d-flex flex-column">
            <h6 class="fw-semibold mb-2">
              {{ p.title }}
            </h6>

            <p class="text-muted small flex-grow-1">
              {{ p.desc }}
            </p>

            <!-- META -->
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted"> <i class="bi bi-eye"></i> {{ p.views }} </small>

              <router-link :to="`/posts/${p.id}`" class="btn btn-sm btn-outline-info">
                Xem chi tiết
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LOAD MORE -->
    <div class="text-center mt-4">
      <button class="btn btn-info text-white px-4">Xem thêm</button>
    </div>
  </div>
</template>

<script setup>
const posts = [
  {
    id: 1,
    title: 'Phương pháp tập Pilates cho người mới',
    desc: 'Hướng dẫn cơ bản giúp cải thiện cột sống và vóc dáng.',
    image: '/images/post1.jpg',
    views: 30,
  },
  {
    id: 2,
    title: 'Ăn uống lành mạnh mỗi ngày',
    desc: 'Dinh dưỡng khoa học giúp cơ thể khỏe mạnh và dẻo dai.',
    image: '/images/post2.jpg',
    views: 28,
  },
  {
    id: 3,
    title: 'Lợi ích của việc vận động nhẹ',
    desc: 'Giúp giảm stress và cải thiện sức khỏe tinh thần.',
    image: '/images/post3.jpg',
    views: 15,
  },
]
</script>
