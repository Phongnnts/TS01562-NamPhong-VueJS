<template>
  <div class="container my-4">
    <div class="row">
      <!-- ===== LEFT ===== -->
      <main class="col-lg-8">
        <h3 class="text-info fw-semibold mb-3">
          Phương pháp tập Pilates giúp phục hồi chấn thương cột sống
        </h3>

        <img src="/images/post1.jpg" class="img-fluid rounded mb-3" />

        <p>
          Tập Pilates có thể vẫn còn khá xa lạ với người Việt, nhưng tại các nước phương Tây đây
          chính là phương pháp tập thể dục giúp giữ vóc dáng.
        </p>

        <h5 class="text-info mt-4">Pilates giúp phục hồi chấn thương cột sống nhanh chóng</h5>

        <p>
          Một trong những lợi ích nổi bật của Pilates đó là tăng cường sức mạnh cho cơ lưng, cơ bụng
          và cải thiện tư thế.
        </p>

        <img src="/images/post2.jpg" class="img-fluid rounded my-3" />

        <h6 class="fw-semibold">Phương pháp tập Pilates Cat Cow</h6>

        <ul>
          <li>Giữ lưng thẳng và kiểm soát hơi thở</li>
          <li>Thực hiện chậm rãi</li>
          <li>Giúp kéo giãn cột sống</li>
        </ul>
      </main>

      <!-- ===== RIGHT: COMMENTS ===== -->
      <aside class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h6 class="fw-semibold mb-3">Bình luận và viết tại đây</h6>

            <textarea
              v-model="newComment"
              class="form-control mb-2"
              rows="3"
              placeholder="Nhập bình luận của bạn"
            ></textarea>

            <button class="btn btn-success w-100 mb-3" @click="addComment">Gửi bình luận</button>

            <h6 class="fw-semibold">Danh sách các bình luận:</h6>

            <ul class="list-unstyled small">
              <li v-for="c in comments" :key="c.id">
                • <strong>{{ c.user }}:</strong> {{ c.text }}
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const comments = ref([
  { id: 1, user: 'Bình An', text: 'Bài viết rất hữu ích' },
  { id: 2, user: 'Anh Cường', text: 'Cảm ơn những chia sẻ bổ ích' },
])

const newComment = ref('')

const addComment = () => {
  if (!newComment.value) return
  comments.value.push({
    id: Date.now(),
    user: 'Người dùng',
    text: newComment.value,
  })
  newComment.value = ''
}
</script>
