import { NextResponse } from "next/server";
import axios from "axios";
import { NewsResponse } from "@/interfaces/interface";

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";
const NEWS_SOURCES = "the-verge, wired, techcrunch, arstechnica";
const SEARCH_QUERY =
  "(React OR Next.js OR TypeScript OR JavaScript OR AI OR OpenAI OR Claude Sonnet OR ChatGPT OR Google Gemini OR software release OR framework update)";
const DATE_RANGE = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

const fetchNews = async (): Promise<NewsResponse> => {
  try {
    console.log("Fetching news...");
    const response = await axios.get<NewsResponse>(`${BASE_URL}/everything`, {
      params: {
        apiKey: API_KEY,
        q: SEARCH_QUERY,
        language: "en",
        sources: NEWS_SOURCES,
        from: DATE_RANGE,
        sortBy: "publishedAt",
      },
    });
    return response.data;
  } catch (error) {
    handleFetchError(error);
    throw new Error("Failed to fetch news");
  }
};

const handleFetchError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("News fetch error:", error.response?.data);
  } else if (error instanceof Error) {
    console.error("News fetch error:", error.message);
  } else {
    console.error("Unknown news fetch error:", error);
  }
};

export const GET = async () => {
  try {
    const news = await fetchNews();
    return NextResponse.json(news);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
};
