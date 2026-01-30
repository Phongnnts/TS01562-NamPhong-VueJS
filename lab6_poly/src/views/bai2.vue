<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card border-success">
        <div class="card-header bg-success text-white">
          <h3 class="mb-0">Bài 2: Xác định mùa theo tháng</h3>
        </div>
        <div class="card-body">
          <p class="text-muted mb-4">Nhập tháng (1-12) để xác định mùa:</p>

          <div class="mb-4">
            <label for="thang" class="form-label">Tháng:</label>
            <input
              type="number"
              id="thang"
              v-model="thang"
              class="form-control"
              min="1"
              max="12"
              placeholder="Nhập tháng từ 1 đến 12"
            />
          </div>

          <div class="alert" :class="mauThongBao">
            <div v-if="thang >= 1 && thang <= 12">
              <strong>Mùa:</strong>
              <span class="ms-2">
                {{ getMua() }}
                <span class="ms-1">{{ getIcon() }}</span>
              </span>
            </div>
            <div v-else-if="thang !== ''">
              <strong>Lỗi:</strong>
              <span class="ms-2">Vui lòng nhập tháng từ 1 đến 12!</span>
            </div>
            <div v-else>
              <strong>Thông báo:</strong>
              <span class="ms-2">Vui lòng nhập tháng để xác định mùa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bai2',
  data() {
    return {
      thang: '',
    }
  },
  computed: {
    mauThongBao() {
      if (this.thang < 1 || this.thang > 12) {
        return 'alert-danger'
      } else if (this.thang >= 1 && this.thang <= 3) {
        return 'alert-success'
      } else if (this.thang >= 4 && this.thang <= 6) {
        return 'alert-warning'
      } else if (this.thang >= 7 && this.thang <= 9) {
        return 'alert-info'
      } else {
        return 'alert-secondary'
      }
    },
  },
  methods: {
    getMua() {
      if (this.thang >= 1 && this.thang <= 3) return 'Xuân'
      if (this.thang >= 4 && this.thang <= 6) return 'Hạ'
      if (this.thang >= 7 && this.thang <= 9) return 'Thu'
      if (this.thang >= 10 && this.thang <= 12) return 'Đông'
      return ''
    },
    getIcon() {
      if (this.thang >= 1 && this.thang <= 3) return '🌸'
      if (this.thang >= 4 && this.thang <= 6) return '☀️'
      if (this.thang >= 7 && this.thang <= 9) return '🍂'
      if (this.thang >= 10 && this.thang <= 12) return '⛄'
      return ''
    },
  },
}
</script>
