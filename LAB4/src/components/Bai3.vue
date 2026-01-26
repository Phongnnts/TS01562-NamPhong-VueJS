<template>
  <div class="container text-center mt-4">
    <!-- Hiển thị lời chào -->
    <h1 class="mb-3">{{ greeting }}</h1>

    <!-- Ô nhập chỉnh sửa lời chào -->
    <input
      type="text"
      class="form-control mb-3"
      v-model="newGreeting"
      placeholder="Nhập lời chào mới..."
    />

    <!-- Nút cập nhật -->
    <button class="btn btn-success" :title="buttonTitle" @click="changeGreeting">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'GreetingComponent',

  data() {
    return {
      greeting: 'Xin chào bạn!',
      newGreeting: '',
      buttonTitle: 'Nhấn để cập nhật lời chào',
      buttonText: 'Cập nhật',
    }
  },

  methods: {
    changeGreeting() {
      if (this.newGreeting.trim() !== '') {
        this.greeting = this.newGreeting
        this.buttonTitle = 'Lời chào đã được cập nhật'
        this.buttonText = 'Đã cập nhật'
        this.newGreeting = ''
      }
    },
  },
}
</script>

<style scoped>
h1 {
  font-weight: 600;
}
</style>
