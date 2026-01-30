<template>
  <div>
    <div class="card border-warning mb-4">
      <div class="card-header bg-warning">
        <h3 class="mb-0">Bài 4: Quản lý học sinh</h3>
      </div>
      <div class="card-body">
        <p class="text-muted">Thực hiện các chức năng CRUD với v-for</p>
      </div>
    </div>
    
    <!-- Form thêm/sửa học sinh -->
    <div class="card mb-4 border">
      <div class="card-header bg-light">
        <h4 class="mb-0">{{ isEditing ? 'Chỉnh sửa học sinh' : 'Thêm học sinh mới' }}</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="isEditing ? capNhatHocSinh() : themHocSinh()">
          <div class="row g-3">
            <div class="col-md-4">
              <label for="hoTen" class="form-label">Họ tên:</label>
              <input 
                type="text" 
                id="hoTen" 
                v-model="hocSinhMoi.hoTen" 
                class="form-control" 
                required 
                placeholder="Nhập họ tên"
              >
            </div>
            <div class="col-md-3">
              <label for="diem" class="form-label">Điểm:</label>
              <input 
                type="number" 
                id="diem" 
                v-model="hocSinhMoi.diem" 
                class="form-control" 
                min="0" 
                max="10" 
                step="0.1" 
                required 
                placeholder="0-10"
              >
            </div>
            <div class="col-md-3">
              <label for="ngaySinh" class="form-label">Ngày sinh:</label>
              <input 
                type="date" 
                id="ngaySinh" 
                v-model="hocSinhMoi.ngaySinh" 
                class="form-control" 
                required
              >
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <button 
                type="submit" 
                class="btn w-100" 
                :class="isEditing ? 'btn-warning' : 'btn-primary'"
              >
                {{ isEditing ? 'Cập nhật' : 'Thêm' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Danh sách học sinh -->
    <div class="card border">
      <div class="card-header bg-light">
        <h4 class="mb-0">Danh sách học sinh</h4>
      </div>
      <div class="card-body">
        <div v-if="danhSachHocSinh.length === 0" class="alert alert-secondary">
          Chưa có học sinh nào. Hãy thêm học sinh mới!
        </div>
        
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr class="table-light">
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Điểm</th>
                <th>Ngày sinh</th>
                <th>Xếp loại</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hocSinh, index) in danhSachHocSinh" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ hocSinh.hoTen }}</td>
                <td>{{ hocSinh.diem }}</td>
                <td>{{ formatNgaySinh(hocSinh.ngaySinh) }}</td>
                <td>
                  <span :class="getXepLoaiClass(hocSinh.diem)">
                    {{ getXepLoai(hocSinh.diem) }}
                  </span>
                </td>
                <td>
                  <button @click="suaHocSinh(index)" class="btn btn-sm btn-outline-primary me-2">
                    Sửa
                  </button>
                  <button @click="xoaHocSinh(index)" class="btn btn-sm btn-outline-danger">
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bai4',
  data() {
    return {
      danhSachHocSinh: [
        { hoTen: 'Nguyễn Chí Hùng', diem: 8, ngaySinh: '2006-01-01' },
        { hoTen: 'Phạm Thị Lan', diem: 9, ngaySinh: '2006-05-15' }
      ],
      hocSinhMoi: {
        hoTen: '',
        diem: '',
        ngaySinh: ''
      },
      isEditing: false,
      editingIndex: -1
    }
  },
  methods: {
    themHocSinh() {
      if (this.hocSinhMoi.hoTen && this.hocSinhMoi.diem && this.hocSinhMoi.ngaySinh) {
        this.danhSachHocSinh.push({
          hoTen: this.hocSinhMoi.hoTen,
          diem: parseFloat(this.hocSinhMoi.diem),
          ngaySinh: this.hocSinhMoi.ngaySinh
        });
        
        this.resetForm();
      }
    },
    
    suaHocSinh(index) {
      this.hocSinhMoi = { ...this.danhSachHocSinh[index] };
      this.isEditing = true;
      this.editingIndex = index;
    },
    
    capNhatHocSinh() {
      if (this.editingIndex !== -1) {
        this.danhSachHocSinh[this.editingIndex] = {
          hoTen: this.hocSinhMoi.hoTen,
          diem: parseFloat(this.hocSinhMoi.diem),
          ngaySinh: this.hocSinhMoi.ngaySinh
        };
        
        this.resetForm();
      }
    },
    
    xoaHocSinh(index) {
      if (confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
        this.danhSachHocSinh.splice(index, 1);
      }
    },
    
    resetForm() {
      this.hocSinhMoi = { hoTen: '', diem: '', ngaySinh: '' };
      this.isEditing = false;
      this.editingIndex = -1;
    },
    
    getXepLoai(diem) {
      if (diem < 5) return 'YẾU';
      if (diem >= 5 && diem < 6.5) return 'TRUNG BÌNH';
      if (diem >= 6.5 && diem < 8) return 'KHÁ';
      if (diem >= 8 && diem < 9) return 'GIỎI';
      if (diem >= 9) return 'XUẤT SẮC';
      return '';
    },
    
    getXepLoaiClass(diem) {
      if (diem < 5) return 'badge bg-danger';
      if (diem >= 5 && diem < 6.5) return 'badge bg-warning';
      if (diem >= 6.5 && diem < 8) return 'badge bg-info';
      if (diem >= 8 && diem < 9) return 'badge bg-success';
      if (diem >= 9) return 'badge bg-primary';
      return 'badge bg-secondary';
    },
    
    formatNgaySinh(ngaySinh) {
      if (!ngaySinh) return '';
      const date = new Date(ngaySinh);
      return date.toLocaleDateString('vi-VN');
    }
  }
}
</script>