<template>
  <div class="container my-4" v-if="post">
    <h4>{{ post.title }}</h4>
    <img :src="post.image" class="img-fluid mb-3" />
    <p>{{ post.content }}</p>

    <CommentList :comments="comments" />
    <CommentForm @add="addComment" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import postService from "@/services/postService";
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";

const route = useRoute();
const post = postService.getById(route.params.id);
const comments = ref([]);

function addComment(c) {
  comments.value.push(c);
}
</script>
