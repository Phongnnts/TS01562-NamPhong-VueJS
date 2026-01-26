const KEY = "POSTS";

const mockPosts = [
  {
    id: 1,
    title: "Phương pháp tập Pilates",
    content: "Pilates giúp phục hồi cột sống hiệu quả",
    image: "/images/post1.jpg",
  },
];

if (!localStorage.getItem(KEY)) {
  localStorage.setItem(KEY, JSON.stringify(mockPosts));
}

export default {
  getAll() {
    return JSON.parse(localStorage.getItem(KEY));
  },
  getById(id) {
    return this.getAll().find((p) => p.id == id);
  },
  add(post) {
    const posts = this.getAll();
    post.id = Date.now();
    posts.push(post);
    localStorage.setItem(KEY, JSON.stringify(posts));
  },
};
