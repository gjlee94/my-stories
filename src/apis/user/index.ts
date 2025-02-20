import { getAccessToken } from "@/utils/auth";

export const getUser = async () => {
  const userInfoEndpoint = `${process.env.NEXT_PUBLIC_AWS_COGNITO_URL}/oauth2/userInfo`;

  const token = getAccessToken();

  if (!token) {
    return null;
  }

  const response = await fetch(userInfoEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
