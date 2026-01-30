<template>
  <div class="text-center py-5">
    <h1 class="text-primary mb-4">Lab 6 - TS01562</h1>

    <div class="row g-4">
      <div class="col-md-3">
        <router-link to="/bai1" class="card text-decoration-none h-100 border-primary">
          <div class="card-body">
            <h5 class="card-title text-primary">Bài 1</h5>
            <p class="card-text text-muted">Conditional Rendering - Xếp loại học sinh</p>
          </div>
        </router-link>
      </div>
      <div class="col-md-3">
        <router-link to="/bai2" class="card text-decoration-none h-100 border-success">
          <div class="card-body">
            <h5 class="card-title text-success">Bài 2</h5>
            <p class="card-text text-muted">Conditional Rendering - Xác định mùa</p>
          </div>
        </router-link>
      </div>
      <div class="col-md-3">
        <router-link to="/bai3" class="card text-decoration-none h-100 border-info">
          <div class="card-body">
            <h5 class="card-title text-info">Bài 3</h5>
            <p class="card-text text-muted">List Rendering - Danh sách bài viết</p>
          </div>
        </router-link>
      </div>
      <div class="col-md-3">
        <router-link to="/bai4" class="card text-decoration-none h-100 border-warning">
          <div class="card-body">
            <h5 class="card-title text-warning">Bài 4</h5>
            <p class="card-text text-muted">List Rendering - Quản lý học sinh</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
