import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Khởi tạo dữ liệu mẫu đơn giản
const initSampleData = () => {
  // Users mẫu
  if (!localStorage.getItem('users')) {
    const users = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=dc3545&color=fff',
        createdAt: '2024-01-01T10:00:00',
      },
      {
        id: 2,
        name: 'Regular User',
        email: 'user@example.com',
        password: 'user123',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=User&background=0d6efd&color=fff',
        createdAt: '2024-01-02T11:00:00',
      },
    ]
    localStorage.setItem('users', JSON.stringify(users))
  }

  // Posts mẫu

  // Comments mẫu
  if (!localStorage.getItem('comments')) {
    const comments = [
      {
        id: 1,
        postId: 1,
        content: 'Bài viết hay!',
        authorId: 2,
        authorName: 'Regular User',
        createdAt: '2024-01-16T11:30:00',
      },
    ]
    localStorage.setItem('comments', JSON.stringify(comments))
  }
}

const app = createApp(App)
initSampleData()
app.use(router)
app.mount('#app')
