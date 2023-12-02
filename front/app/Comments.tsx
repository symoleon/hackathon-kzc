import Comment from "./Comment";

interface Comment {
  id: number;
  username: string;
  opinion: string;
}

export default async function Comments() {
  const comments = await fetch('http://localhost:3000/api/comments', {cache: "no-cache"}).then(res => res.json()) as Comment[];
  return (
    <div className="flex flex-col items-center">
      <h1 className="tracking-wide text-3xl font-bold">Opinions</h1>
      <ul>
        {comments.map((comment: any) => (
          <li key={comment.id} className="m-4">
            <Comment username= {comment.username} opinion={comment.opinion} />
          </li>
        ))}
      </ul>
    </div>
  )
}