import { reactive } from 'vue'

export const auth = reactive({
  isLoggedIn: false,
  user: null,

  login(email, password) {
    // Giả lập user đã đăng ký
    const savedUser = JSON.parse(localStorage.getItem('user'))

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      this.isLoggedIn = true
      this.user = {
        name: savedUser.name,
        email: savedUser.email,
      }
      return true
    }

    alert('Sai email hoặc mật khẩu')
    return false
  },

  register(name, email, password) {
    const user = { name, email, password }

    localStorage.setItem('user', JSON.stringify(user))

    this.isLoggedIn = true
    this.user = { name, email }
  },

  logout() {
    this.isLoggedIn = false
    this.user = null
  },
})
