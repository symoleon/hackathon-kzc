interface Params {
  username: string;
  opinion: string;
  date: number;
}
export default function Comment({ username, opinion, date }: Params) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <h3 className="font-bold">{username}</h3>
        <div className="text-sm text-zinc-200">
          {`(${(new Date(date * 1000)).toLocaleDateString()})`}
        </div>
      </div>
      <p className="pl-4 italic">{opinion}</p>
    </div>
  )
}