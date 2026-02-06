import { FeedItem } from "../types/feed";

const BASE_URL = "https://picsum.photos/v2/list";

export async function fetchFeed(
  page: number,
  limit: number,
): Promise<FeedItem[]> {
  const res = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);

  if (!res.ok) {
    throw new Error("Failed to fetch feed");
  }

  return res.json();
}
