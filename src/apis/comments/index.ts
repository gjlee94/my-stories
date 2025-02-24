import { getAccessToken } from "@/utils/auth";

const BASE_URL = process.env.NEXT_PUBLIC_AWS_API_URL;

export const getComments = async (postId: string) => {
  const response = await fetch(`${BASE_URL}/comments/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export interface Comment {
  postId: string;
  commentId: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export const addComment = async (
  postId: string,
  payload: {
    content: string;
    author: string;
  }
) => {
  try {
    const token = getAccessToken();

    if (!token) {
      throw new Error("인증 토큰이 없습니다.");
    }

    const response = await fetch(`${BASE_URL}/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
