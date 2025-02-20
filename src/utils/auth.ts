export function openLoginPopup() {
  const loginUrl = `https://ap-northeast-2nzsznnb7w.auth.ap-northeast-2.amazoncognito.com/oauth2/authorize?client_id=7kr8uutulbgbs9jvldjhta97tb&response_type=token&scope=email%20openid%20profile&redirect_uri=https://dz8loj6wyz9a4.cloudfront.net/auth/callback`;

  const popup = window.open(loginUrl, "Login", "width=500,height=600");

  window.addEventListener(
    "message",
    (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data.idToken) {
        sessionStorage.setItem("idToken", event.data.idToken);
        popup?.close();
        window.location.reload();
      }
      if (event.data.accessToken) {
        sessionStorage.setItem("accessToken", event.data.accessToken);
        popup?.close();
        window.location.reload();
      }
    },
    { once: true }
  );
}
export function getIdToken() {
  return sessionStorage.getItem("idToken") ?? undefined;
}
export function getAccessToken() {
  return sessionStorage.getItem("accessToken") ?? undefined;
}

export function logout() {
  sessionStorage.removeItem("idToken");
  sessionStorage.removeItem("accessToken");
  window.location.reload();
}
