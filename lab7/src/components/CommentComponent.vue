<template>
  <h5>Bình luận ({{ user }})</h5>

  <form @submit.prevent="send">
    <textarea
      class="form-control"
      v-model="text"
      placeholder="Nhập bình luận của bạn"
    ></textarea>
    <button class="btn btn-success mt-2">Gửi bình luận</button>
  </form>

  <ul class="list-group mt-3">
    <li
      class="list-group-item"
      v-for="(c, i) in comments"
      :key="i"
    >
      <b>{{ c.user }}:</b> {{ c.text }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['user'])
const text = ref('')
const comments = ref([])

const send = () => {
  if (text.value) {
    comments.value.push({
      user: props.user,
      text: text.value
    })
    text.value = ''
  }
}
</script>
