import { NewsResponse } from "@/interfaces/interface";

const fetchNewsFromApi = async (): Promise<NewsResponse> => {
  const response = await fetch("/api/news");
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
};

export default fetchNewsFromApi;
