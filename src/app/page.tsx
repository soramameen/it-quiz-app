import FetchNews from "@/app/components/FetchNews";
import "dotenv/config"; // .envファイルを自動的に読み込む

export default function Home() {
  return (
    <>
      <h1>home</h1>
      <FetchNews />
    </>
  );
}
