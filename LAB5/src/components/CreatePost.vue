<template>
  <div>
    <h3>Tạo bài viết mới</h3>

    <input v-model="title" placeholder="Tiêu đề bài viết" />
    <input v-model="author" placeholder="Tên tác giả" />
    <textarea v-model="content" placeholder="Nội dung bài viết"></textarea>

    <button @click="submitPost">Đăng bài</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["add-post"]);

const title = ref("");
const author = ref("");
const content = ref("");

const submitPost = () => {
  if (title.value && author.value && content.value) {
    emit("add-post", {
      title: title.value,
      author: author.value,
      content: content.value,
      textColor: "green",
    });

    title.value = "";
    author.value = "";
    content.value = "";
  }
};
</script>

<style>
input,
textarea {
  display: block;
  width: 100%;
  margin: 10px 0;
}
button {
  padding: 8px 20px;
}
</style>
