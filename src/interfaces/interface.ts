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
// 型定義（必要に応じて詳細化）
export interface Quiz {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
export interface QuizQuestionProps {
  quiz: Quiz;
  currentQuiz: number;
  totalQuizzes: number;
  onAnswer: (selectedOption: string) => void;
}
export interface QuizResultsProps {
  quizzes: Quiz[];
  userAnswers: string[];
  score: number;
  onRestart: () => void;
}
