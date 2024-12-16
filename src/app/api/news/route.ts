import { NextResponse } from "next/server";
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
  const API_KEY = process.env.NEWS_API_KEY;
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

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // AxiosError の場合
      console.error(
        "ニュース取得中にエラーが発生しました:",
        error.response?.data
      );
    } else if (error instanceof Error) {
      // 標準 Error オブジェクトの場合
      console.error("ニュース取得中にエラーが発生しました:", error.message);
    } else {
      // その他の型の場合
      console.error("ニュース取得中に不明なエラーが発生しました:", error);
    }
    throw new Error("Failed to fetch news");
  }
};

export const GET = async () => {
  try {
    const news = await fetchNews();
    return NextResponse.json(news); // 取得したデータをそのまま返す
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // AxiosError の場合
      console.error(
        "ニュース取得中にエラーが発生しました:",
        error.response?.data
      );
    } else if (error instanceof Error) {
      // 標準 Error オブジェクトの場合
      console.error("ニュース取得中にエラーが発生しました:", error.message);
    } else {
      // その他の型の場合
      console.error("ニュース取得中に不明なエラーが発生しました:", error);
    }
    throw new Error("Failed to fetch news");
  }
};
