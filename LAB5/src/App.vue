<template>
  <div class="container">
    <h1>TS01256 - Nguyễn Nam Phong</h1>

    <Bai1Message />
    <hr />
    <Bai2TwoWay />
    <hr />
    <Bai3UserInfo />
    <hr />

    <h2>Bài 4: Đăng bài với t</h2>
    <CreatePost @add-post="addPost" />
    <PostList :posts="posts" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Bai1Message from "./components/Bai1_TinNhan.vue";
import Bai2TwoWay from "./components/Bai2_HaiChieu.vue";
import Bai3UserInfo from "./components/Bai3_ThongTin.vue";
import CreatePost from "./components/CreatePost.vue";
import PostList from "./components/PostList.vue";

const posts = ref([]);

const addPost = (post) => {
  posts.value.push(post);
};
</script>

<style>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}
hr {
  margin: 30px 0;
}
</style>
