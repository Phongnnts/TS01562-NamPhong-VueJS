// Lấy tất cả comments
const getComments = () => {
  return JSON.parse(localStorage.getItem('comments')) || []
}

// Lưu comments
const saveComments = (comments) => {
  localStorage.setItem('comments', JSON.stringify(comments))
}

// Lấy comments theo postId
export const getCommentsByPost = (postId) => {
  const comments = getComments()
  return comments
    .filter((comment) => comment.postId === Number(postId))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
}

// Tạo comment mới
export const createComment = (commentData) => {
  const comments = getComments()
  const user = JSON.parse(localStorage.getItem('currentUser'))

  const newComment = {
    id: Date.now(),
    postId: commentData.postId,
    content: commentData.content,
    authorId: user.id,
    authorName: user.name,
    createdAt: new Date().toISOString(),
  }

  comments.push(newComment)
  saveComments(comments)
  return newComment
}

// Xóa comment
export const deleteComment = (id) => {
  const comments = getComments()
  const newComments = comments.filter((comment) => comment.id !== Number(id))

  if (newComments.length !== comments.length) {
    saveComments(newComments)
    return true
  }

  return false
}
