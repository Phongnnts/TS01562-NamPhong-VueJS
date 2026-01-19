<template>
  <div class="container my-4">
    <div class="row g-4">
      <aside class="col-lg-3">
        <SidebarLeft />
      </aside>

      <main class="col-lg-6">
        <h5 class="text-info">Blog của tôi</h5>
        <div class="card mb-3">
          <div class="card-body">
            <h6>Phương pháp Pilates</h6>
            <p class="text-muted small">Nội dung demo bài viết</p>
          </div>
        </div>
      </main>

      <aside class="col-lg-3">
        <SidebarRight />
      </aside>
    </div>

    <h5 class="text-info text-center mt-4">VIDEO</h5>
    <div class="row row-cols-1 row-cols-md-4 g-3">
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
    </div>
  </div>
</template>

<script setup>
import SidebarLeft from "../components/layout/SidebarLeft.vue";
import SidebarRight from "../components/layout/SidebarRight.vue";
import VideoCard from "../components/common/VideoCard.vue";
</script>
