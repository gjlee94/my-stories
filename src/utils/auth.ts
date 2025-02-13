export function openLoginPopup() {
  const loginUrl = `https://ap-northeast-2nzsznnb7w.auth.ap-northeast-2.amazoncognito.com/oauth2/authorize?client_id=7kr8uutulbgbs9jvldjhta97tb&response_type=token&scope=email%20openid%20profile&redirect_uri=https://dz8loj6wyz9a4.cloudfront.net/auth/callback`;

  const popup = window.open(loginUrl, "Login", "width=500,height=600");

  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.data.token) {
      sessionStorage.setItem("authToken", event.data.token);
      popup?.close();
      window.location.reload();
    }
  });
}
export function getAuthToken() {
  return sessionStorage.getItem("authToken");
}

export function logout() {
  sessionStorage.removeItem("authToken");
  window.location.reload();
}
