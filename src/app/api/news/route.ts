import { NextResponse } from "next/server";
import axios from "axios";
import { NewsResponse } from "@/interfaces/interface";

const fetchNews = async (): Promise<NewsResponse> => {
  const API_KEY = process.env.NEWS_API_KEY;
  const BASE_URL = "https://newsapi.org/v2";

  try {
    console.log("catching news....");
    const response = await axios.get<NewsResponse>(`${BASE_URL}/everything`, {
      params: {
        apiKey: API_KEY,
        q: "(React OR Next.js OR TypeScript OR JavaScript OR AI OR OpenAI OR Claude Sonnet OR ChatGPT OR Google Gemini OR software release OR framework update)",
        language: "en",
        sources: "the-verge, wired, techcrunch, arstechnica",
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 過去7日間
        sortBy: "publishedAt",
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
