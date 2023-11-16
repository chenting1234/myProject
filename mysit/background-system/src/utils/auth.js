const token = "token";
const TokenKey = "vue_admin_template_token";

export function getToken() {
  return localStorage.getItem(token);
}

export function setToken(value) {
  return localStorage.setItem(token, `Bearer ${value}`);
}

export function removeToken() {
  return localStorage.removeItem(token);
}
