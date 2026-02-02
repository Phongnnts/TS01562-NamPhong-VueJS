<template>
  <div class="row border p-3">
    <div class="col-md-6">
      <h4>Form Đăng Ký</h4>
      <div class="mb-2">
        <label>Họ tên:</label>
        <input class="form-control" v-model="form.name" />
      </div>

      <div class="mb-2">
        <label>Email:</label>
        <input class="form-control" v-model="form.email" />
      </div>

      <div class="mb-2">
        <label>Mật khẩu:</label>
        <input type="password" class="form-control" v-model="form.password" />
      </div>

      <div class="mb-2">
        <label>Ngày sinh:</label>
        <input type="date" class="form-control" v-model="form.dob" />
      </div>

      <div class="mb-2">
        <label>Giới tính:</label><br />
        <input type="radio" value="Nam" v-model="form.gender" /> Nam
        <input type="radio" value="Nữ" v-model="form.gender" class="ms-2" /> Nữ
        <input type="radio" value="Khác" v-model="form.gender" class="ms-2" /> Khác
      </div>

      <div class="mb-3">
        <label>Ngôn ngữ:</label><br />
        <input type="checkbox" value="Tiếng Việt" v-model="form.languages" /> Tiếng Việt
        <input type="checkbox" value="Tiếng Anh" v-model="form.languages" class="ms-2" /> Tiếng Anh
        <input type="checkbox" value="Tiếng Nhật" v-model="form.languages" class="ms-2" /> Tiếng
        Nhật
      </div>

      <button class="btn btn-primary" @click="submitted = true">Đăng ký</button>
    </div>

    <div class="col-md-6" v-if="submitted">
      <h4>Thông tin đã đăng ký:</h4>
      <p><b>Họ tên:</b> {{ form.name }}</p>
      <p><b>Email:</b> {{ form.email }}</p>
      <p><b>Ngày sinh:</b> {{ form.dob }}</p>
      <p><b>Giới tính:</b> {{ form.gender }}</p>
      <p><b>Ngôn ngữ:</b> {{ form.languages.join(', ') }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  dob: '',
  gender: 'Nam',
  languages: [],
})
</script>
