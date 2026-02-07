// Lấy tất cả posts
const getPosts = () => {
  return JSON.parse(localStorage.getItem('posts')) || []
}

// Lưu posts
const savePosts = (posts) => {
  localStorage.setItem('posts', JSON.stringify(posts))
}

// Lấy tất cả bài viết
export const getAllPosts = () => {
  return getPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// Lấy bài viết theo ID
export const getPostById = (id) => {
  const posts = getPosts()
  return posts.find((post) => post.id === Number(id)) || null
}

// Tạo bài viết mới
export const createPost = (postData) => {
  const posts = getPosts()
  const user = JSON.parse(localStorage.getItem('currentUser'))

  const newPost = {
    id: Date.now(),
    title: postData.title,
    content: postData.content,
    image: postData.image || '',
    author: user.name,
    authorEmail: user.email,
    authorId: user.id,
    views: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  posts.push(newPost)
  savePosts(posts)
  return newPost
}

// Cập nhật bài viết
export const updatePost = (id, updatedData) => {
  const posts = getPosts()
  const index = posts.findIndex((post) => post.id === Number(id))

  if (index === -1) return null

  posts[index] = {
    ...posts[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  }

  savePosts(posts)
  return posts[index]
}

// Xóa bài viết
export const deletePost = (id) => {
  const posts = getPosts()
  const newPosts = posts.filter((post) => post.id !== Number(id))

  if (newPosts.length !== posts.length) {
    savePosts(newPosts)

    // Xóa comments liên quan
    deleteCommentsByPostId(id)

    return true
  }

  return false
}

// Xóa comments theo postId
const deleteCommentsByPostId = (postId) => {
  const comments = JSON.parse(localStorage.getItem('comments')) || []
  const newComments = comments.filter((comment) => comment.postId !== Number(postId))
  localStorage.setItem('comments', JSON.stringify(newComments))
}
