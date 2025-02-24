import {  getAccessToken } from "@/utils/auth";

const BASE_URL = process.env.NEXT_PUBLIC_AWS_API_URL;

export const getReactions = async (pageId: string) => {
  const response = await fetch(`${BASE_URL}/reactions/${pageId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const addReaction = async (
  pageId: string,
  payload: { action: "like" | "dislike" | "heart"; username: string }
) => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const response = await fetch(`${BASE_URL}/reactions/${pageId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
