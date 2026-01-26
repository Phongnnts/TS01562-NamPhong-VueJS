const KEY = "USER_LOGIN";

export default {
  login(user) {
    localStorage.setItem(KEY, JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem(KEY);
  },
  getUser() {
    return JSON.parse(localStorage.getItem(KEY));
  },
  isLogin() {
    return !!localStorage.getItem(KEY);
  },
};
