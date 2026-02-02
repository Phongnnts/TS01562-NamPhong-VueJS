<template>
  <div class="container mt-4">
    <h3 class="text-center mb-4">Bài 4 – Bình luận bài viết</h3>

    <div v-if="!user" class="row justify-content-center">
      <div class="col-md-4">
        <LoginComponent @success="user = $event" />
      </div>
    </div>

    <div v-else class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <img
            src="https://qltt.vn/stores/news_dataimages/hanhnth3/122023/12/14/1031_tong_hop_5_loai_trai_cay_giau_canxi_cho_tre_phat_trien_chieu_cao4_e95757acc6.jpg?rt=20231212141032"
            class="card-img-top"
          />

          <div class="card-body">
            <h5 class="card-title">8 loại rau củ quả giàu canxi</h5>
            <p class="card-text">
              Canxi là khoáng chất cần thiết cho cơ thể. Bổ sung canxi qua thực phẩm là cách hiệu
              quả và an toàn.
            </p>

            <CommentComponent :user="user" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginComponent from './LoginComponent.vue'
import CommentComponent from './CommentComponent.vue'

const user = ref('')
</script>
