// Lấy tất cả users
const getUsers = () => {
  return JSON.parse(localStorage.getItem('users')) || []
}

// Lưu users
const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users))
}

// Đăng ký
export const register = (userData) => {
  const users = getUsers()

  // Kiểm tra email đã tồn tại
  if (users.find((u) => u.email === userData.email)) {
    throw new Error('Email đã tồn tại')
  }

  // Tạo user mới
  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: 'user',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0d6efd&color=fff`,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)
  return newUser
}

// Đăng nhập
export const login = (email, password) => {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new Error('Email hoặc mật khẩu không đúng')
  }

  // Lưu user hiện tại
  const { password: _, ...userWithoutPassword } = user
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))

  return userWithoutPassword
}

// Đăng xuất
export const logout = () => {
  localStorage.removeItem('currentUser')
}

// Lấy user hiện tại
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

// Kiểm tra đăng nhập
export const isLoggedIn = () => {
  return !!getCurrentUser()
}

// Cập nhật profile
export const updateProfile = (updatedData) => {
  const users = getUsers()
  const currentUser = getCurrentUser()

  if (!currentUser) {
    throw new Error('Chưa đăng nhập')
  }

  const index = users.findIndex((u) => u.id === currentUser.id)

  if (index === -1) {
    throw new Error('User không tồn tại')
  }

  // Cập nhật
  users[index] = {
    ...users[index],
    ...updatedData,
    avatar: updatedData.avatar || users[index].avatar,
  }

  saveUsers(users)

  // Cập nhật session
  const updatedSession = {
    ...currentUser,
    name: updatedData.name || currentUser.name,
    avatar: updatedData.avatar || currentUser.avatar,
  }

  localStorage.setItem('currentUser', JSON.stringify(updatedSession))

  return updatedSession
}
