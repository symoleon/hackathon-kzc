import CategorizedOpinions from "./CategorizedOpinions";

interface Opinion {
  username: string;
  opinion: string;
  sentiment: string;
  tags: string[];
  date: number;
}

export default async function Opinions() {

  const res = await fetch('http://localhost:8000/admin/comment', {cache: "no-cache"}).then(res => res.json()) as string[][];
  const comments = res.map((comment: string[]) => ({username: comment[0], opinion: comment[1],date: comment[2], sentiment: comment[3], tags: JSON.parse(comment[4].replaceAll("'", '"'))}));
  // console.log(comments);
  // comments.sort((a, b) => b.date - a.date);
  comments.reverse();
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="tracking-wide text-3xl font-bold">Opinions</h1>
      <CategorizedOpinions opinions={comments} />
    </div>
  )
}