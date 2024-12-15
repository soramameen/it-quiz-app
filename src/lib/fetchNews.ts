import axios from "axios";

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

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

const fetchNews = async (): Promise<NewsResponse> => {
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const BASE_URL = "https://newsapi.org/v2";

  try {
    console.log("catching news....");
    const response = await axios.get<NewsResponse>(`${BASE_URL}/everything`, {
      params: {
        apiKey: API_KEY,
        q: "AI", // 検索キーワード
        language: "en", // 言語
      },
    });

    return response.data; // NewsResponse型を返す
  } catch (error) {
    console.error("ニュース取得中にエラーが発生しました:", error);
    throw new Error("Failed to fetch news");
  }
};

export default fetchNews;
