"use client";
import React, { useState, useEffect } from "react";
import fetchNews from "@/lib/fetchNews";
import { NewsResponse } from "@/lib/fetchNews";

type Quiz = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

function FetchNews() {
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("news", news);
  useEffect(() => {
    async function getNews() {
      try {
        const response: NewsResponse = await fetchNews(); // fetchNewsがNewsResponseを返す
        setNews(response);

        const generatedQuizzes: Quiz[] = [];
        for (const article of response.articles.slice(0, 3)) {
          const quizResponse = await fetch("/api/generateQuiz", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: `title:${article.title} content:${article.description}`,
            }),
          });

          if (quizResponse.ok) {
            const quiz = await quizResponse.json();
            generatedQuizzes.push(quiz);
          } else {
            console.error("Failed to generate quiz for:", article.title);
          }
        }
        setQuizzes(generatedQuizzes);
      } catch (error) {
        console.error("ニュースの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    }

    getNews();
  }, []);

  return (
    <div>
      <h1>Latest News and Quizzes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* <h2>News</h2>
          {news ? (
            <ul>
              {news.articles.map((article, index) => (
                <li key={index}>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>ニュースが取得できませんでした。</p>
          )} */}

          <h2>Generated Quizzes</h2>
          {quizzes && quizzes.length > 0 ? (
            <ul>
              {quizzes.map((quiz, index) => (
                <li key={index}>
                  <h3>{quiz.question}</h3>
                  <ul>
                    {quiz.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Answer:</strong> {quiz.answer}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {quiz.explanation}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>クイズが生成されませんでした。</p>
          )}
        </>
      )}
    </div>
  );
}

export default FetchNews;
