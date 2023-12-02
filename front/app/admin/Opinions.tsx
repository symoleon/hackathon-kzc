import CategorizedOpinions from "./CategorizedOpinions";

interface Opinion {
  id: number;
  username: string;
  opinion: string;
  sentiment: string;
  tags: string[];
  date: number;
}

export default async function Opinions() {

  const comments = await fetch('http://localhost:3000/api/comments?admin=true', {cache: "no-cache"}).then(res => res.json()) as Opinion[];
  comments.sort((a, b) => b.date - a.date);
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="tracking-wide text-3xl font-bold">Opinions</h1>
      <CategorizedOpinions opinions={comments} />
    </div>
  )
}