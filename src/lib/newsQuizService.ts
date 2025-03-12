import fetchNewsFromApi from "@/lib/fetchNewsFromApi";
import { NewsResponse, Quiz } from "@/interfaces/interface";

export const fetchNewsAndGenerateQuizzes = async (): Promise<Quiz[]> => {
  try {
    const response: NewsResponse = await fetchNewsFromApi();

    const generatedQuizzes = await Promise.all(
      response.articles.slice(0, 5).map(async (article) => {
        const quizResponse = await fetch("/api/generateQuiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `title:${article.title} content:${article.description}`,
          }),
        });
        return quizResponse.ok ? await quizResponse.json() : null;
      })
    );

    return generatedQuizzes.filter(Boolean);
  } catch (error) {
    console.error("ニュースの取得またはクイズ生成に失敗しました:", error);
    return [];
  }
};
