import { NextRequest, NextResponse } from "next/server";

const generateQuiz = async (content: string) => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            process.env.GROQ_API_KEY || "your-groq-api-key-here"
          }`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are an AI that generates multiple-choice quizzes from content.",
            },
            { role: "user", content: formatPrompt(content) },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Groq API response:", data);

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No quiz generated");
    }

    return JSON.parse(data.choices[0]?.message?.content || "{}");
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz");
  }
};

const formatPrompt = (content: string) => `
あなたはニュース記事を基に三択クイズを作成するAIです。以下のニュースをもとに、三択クイズを生成してください。

**ニュース記事**:
[${content}]

**出力形式**:
以下の形式でJSON形式で出力してください（整形済みのJSONとして出力してください）。もちろん内容はすべて日本語で答えてください。
{
  "question": "ニュースの内容に基づくクイズの質問",
  "options": ["選択肢1", "選択肢2", "選択肢3"],
  "answer": "正しい選択肢",
  "explanation": "クイズの正答に関する技術者向けの補足説明"
}

**条件**:
- 質問はニュース記事の中で最も注目すべき内容をもとに、「そのニュースの背景・影響」を考えさせるように作成してください。
- 選択肢は正解1つと、不正解2つを含めてください。
- ただし、不正解の選択肢も「ニュースの内容に似ているが誤解しやすいもの」にしてください。
- 補足説明には、ニュース記事の要点と、そのニュースが技術者にとってなぜ重要なのかを簡潔に説明してください。

それでは、ニュースを基にクイズを作成してください。
`;

export const POST = async (req: NextRequest) => {
  try {
    const { content } = await req.json();
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const quiz = await generateQuiz(content);
    return NextResponse.json(quiz, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
};
