import Comment from "./Comment";

// interface Comment {
//   id: number;
//   username: string;
//   opinion: string;
//   date: number;
// }


export default async function Comments() {
  const res = await fetch('http://localhost:8000/customer/comment', {cache: "no-cache"}).then(res => res.json()) as string[][];
  const comments = res.map((comment: string[]) => ({username: comment[0], opinion: comment[1], date: comment[2]}));
  comments.reverse();
  // console.log(comments)
  // comments.sort((a, b) => b.date - a.date);
  return (
    <div className="flex flex-col items-center">
      <h1 className="tracking-wide text-3xl font-bold">Opinions</h1>
      <ul>
        {comments.map((comment: any) => (
          <li key={comment.username} className="m-4">
            <Comment username= {comment.username} opinion={comment.opinion} date={comment.date} />
          </li>
        ))}
      </ul>
    </div>
  )
}