'use client';
interface Params {
  username: string;
  opinion: string;
  sentiment: string;
  tags: string[];
  date: number;
}
function OpinionDiv({ sentiment, children }: { sentiment: string, children: React.ReactNode }) {
  const negativeOpinion = (
    <div className={`bg-red-700`}>
      {children}
    </div>
  );
  const positiveOpinion = (
    <div className={`bg-green-700`}>
      {children}
    </div>
  );
  return (
    <div>
      {sentiment === "negative" ? negativeOpinion : positiveOpinion}
    </div>
  );
}

export default function Opinion({ username, opinion, sentiment, tags, date }: Params) {
  return (
    <OpinionDiv sentiment={sentiment}>
      <div className="flex gap-4">
        <h3 className="font-bold">{username}</h3>
        <div>
          {(new Date(date * 1000)).toLocaleDateString()}
        </div>
        <div className="italic text-slate-200">
          {tags.reduce((acc, tag) => acc = `${acc} #${tag}`, "")}
        </div>
      </div>
      <p className="pl-4 italic">{opinion}</p>
    </OpinionDiv>
  )
} 