export const getUser = async () => {
  const userInfoEndpoint = `${process.env.NEXT_PUBLIC_AWS_COGNITO_URL}/oauth2/userInfo`;

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
