export const getUser = async () => {
  const userInfoEndpoint =
    "https://ap-northeast-2nzsznnb7w.auth.ap-northeast-2.amazoncognito.com/oauth2/userInfo";

  const token = sessionStorage.getItem("accessToken");
  console.log("token: ", token);

  const response = await fetch(userInfoEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
