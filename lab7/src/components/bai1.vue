<template>
  <div class="col-md-5">
    <h3>Quản lý công việc</h3>

    <form @submit.prevent="addJob">
      <input class="form-control mb-2" v-model="newJob" placeholder="Tên công việc">
      <button class="btn btn-primary">Thêm</button>
    </form>

    <ul class="list-group mt-3">
      <li class="list-group-item d-flex justify-content-between"
          v-for="(job, i) in jobs" :key="i">
        {{ job }}
        <button class="btn btn-danger btn-sm" @click="remove(i)">Xóa</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newJob = ref('')
const jobs = ref(['Ăn sáng', 'Đi học'])

const addJob = () => {
  if (newJob.value.trim()) {
    jobs.value.push(newJob.value)
    newJob.value = ''
  }
}
const remove = i => jobs.value.splice(i, 1)
</script>
