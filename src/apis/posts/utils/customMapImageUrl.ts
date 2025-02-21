export const customMapImageUrl = (url: string): string => {
  if (!url) {
    throw new Error("URL can't be empty");
  }

  if (
    url.startsWith("data:") ||
    url.startsWith("https://images.unsplash.com")
  ) {
    return url;
  }

  // Notion API v2에서는 대부분의 경우 직접 사용 가능한 URL을 제공합니다
  return url;
};
