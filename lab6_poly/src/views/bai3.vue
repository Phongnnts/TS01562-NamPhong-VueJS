<template>
  <div>
    <div class="card border-info mb-4">
      <div class="card-header bg-info text-white">
        <h3 class="mb-0">Bài 3: Danh sách bài viết</h3>
      </div>
      <div class="card-body">
        <p class="text-muted">Sử dụng v-for để hiển thị danh sách bài viết</p>
      </div>
    </div>

    <div class="row g-4">
      <div v-for="(baiViet, index) in danhSachBaiViet" :key="index" class="col-md-6">
        <div class="card h-100 border">
          <div class="card-body">
            <h5 class="card-title">{{ baiViet.tieuDe }}</h5>
            <p class="card-text text-muted">{{ baiViet.moTa }}</p>
            <button class="btn btn-outline-primary btn-sm">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bai3',
  data() {
    return {
      danhSachBaiViet: [
        {
          tieuDe: '8 loại rau củ quả giàu canxi',
          moTa: 'Canxi là khoảng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất.',
        },
        {
          tieuDe: '10 loại thực phẩm tốt cho tim mạch',
          moTa: 'Tim mạch là một trong những bộ phận quan trọng nhất của cơ thể. Duy trì một chế độ ăn uống lành mạnh là cách tốt nhất để bảo vệ tim mạch.',
        },
        {
          tieuDe: '5 bài tập thể dục tại nhà hiệu quả',
          moTa: 'Bạn không có thời gian đến phòng gym? Đừng lo lắng, có nhiều bài tập thể dục hiệu quả có thể thực hiện ngay tại nhà với dụng cụ đơn giản.',
        },
        {
          tieuDe: '7 bí quyết để có giấc ngủ ngon',
          moTa: 'Giấc ngủ đóng vai trò quan trọng đối với sức khỏe tổng thể. Một giấc ngủ ngon giúp cơ thể phục hồi và tái tạo năng lượng cho ngày mới.',
        },
      ],
    }
  },
}
</script>
