interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  content: string | null;
}

const fetchNewsFromApi = async (): Promise<NewsResponse> => {
  const response = await fetch("/api/news");
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
};

export default fetchNewsFromApi;
