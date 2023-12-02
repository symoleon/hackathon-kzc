'use client';
interface Params {
  username: string;
  opinion: string;
  sentiment: string;
  tags: string[];
  date: string;
}
function OpinionDiv({ sentiment, children }: { sentiment: string, children: React.ReactNode }) {
  const negativeOpinion = (
    <div className={`py-2 px-4 rounded-2xl bg-red-700`}>
      {children}
    </div>
  );
  const positiveOpinion = (
    <div className={`py-2 px-4 rounded-2xl bg-green-700`}>
      {children}
    </div>
  );
  return (
    <div>
      {sentiment === "BAD" ? negativeOpinion : positiveOpinion}
    </div>
  );
}

export default function Opinion({ username, opinion, sentiment, tags, date }: Params) {
  return (
    <OpinionDiv sentiment={sentiment}>
      <div className="flex items-baseline gap-4">
        <h3 className="font-bold">{username}</h3>
        <div className="text-sm text-zinc-200">
          {`(${(new Date(date)).toLocaleDateString()})`}
        </div>
        <div className="italic text-slate-200">
          {tags.reduce((acc, tag) => acc = `${acc} #${tag}`, "")}
        </div>
      </div>
      <p className="pl-4 italic">{opinion}</p>
    </OpinionDiv>
  )
} 