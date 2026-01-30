<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card border-primary">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0">Bài 1: Xếp loại học sinh</h3>
        </div>
        <div class="card-body">
          <p class="text-muted mb-4">Nhập điểm trung bình để xem xếp loại:</p>

          <div class="mb-4">
            <label for="diemTB" class="form-label">Điểm trung bình:</label>
            <input
              type="number"
              id="diemTB"
              v-model="diemTrungBinh"
              class="form-control"
              step="0.1"
              min="0"
              max="10"
              placeholder="Nhập điểm từ 0 đến 10"
            />
          </div>

          <div class="alert alert-light border" v-if="diemTrungBinh !== ''">
            <div class="row align-items-center">
              <div class="col-auto">
                <strong>Xếp loại:</strong>
              </div>
              <div class="col">
                <span v-if="diemTrungBinh < 5" class="badge bg-danger">YẾU</span>
                <span v-else-if="diemTrungBinh >= 5 && diemTrungBinh < 6.5" class="badge bg-warning"
                  >TRUNG BÌNH</span
                >
                <span v-else-if="diemTrungBinh >= 6.5 && diemTrungBinh < 8" class="badge bg-info"
                  >KHÁ</span
                >
                <span v-else-if="diemTrungBinh >= 8 && diemTrungBinh < 9" class="badge bg-success"
                  >GIỎI</span
                >
                <span v-else-if="diemTrungBinh >= 9" class="badge bg-primary">XUẤT SẮC</span>
              </div>
            </div>
          </div>

          <div v-else class="alert alert-secondary">
            Vui lòng nhập điểm trung bình để xem xếp loại
          </div>

          <hr class="my-4" />

          <div>
            <h5 class="mb-3">Demo v-show vs v-if</h5>
            <button @click="toggleDemo" class="btn btn-outline-secondary btn-sm mb-3">
              {{ showDemo ? 'Ẩn Demo' : 'Hiện Demo' }}
            </button>

            <div v-if="showDemo" class="alert alert-warning mb-2">
              <strong>v-if:</strong> Phần tử này được tạo/xóa khỏi DOM khi điều kiện thay đổi
            </div>

            <div v-show="showDemo" class="alert alert-info">
              <strong>v-show:</strong> Phần tử này luôn tồn tại trong DOM, chỉ thay đổi thuộc tính
              display
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bai1',
  data() {
    return {
      diemTrungBinh: '',
      showDemo: true,
    }
  },
  methods: {
    toggleDemo() {
      this.showDemo = !this.showDemo
    },
  },
}
</script>
