'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
export default function OpinionForm() {
    const [username, setUsername] = useState('');
    const [opinion, setOpinion] = useState('');
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleOpinionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setOpinion(e.target.value);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isMutating = isPending || isFetching;
    const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFetching(true);
        const formData = new FormData(e.currentTarget);
        const body = {
            username: formData.get("username"),
            opinion: formData.get("opinion"),
        };
        await fetch("http://localhost:3000/api/comments", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        setIsFetching(false);
        startTransition(() => {
            router.refresh();
        });
    }
    return (
        <div className="flex flex-col items-center">
            <h1 className="tracing-wide text-3xl font-bold">Publish opinion</h1>
            <form className="flex flex-col items-center" onSubmit={postComment}>
                <div className="m-2 flex flex-col items-center">
                    <label htmlFor="username">Username</label>
                    <input className="rounded-lg bg-zinc-600" type="text" name="username" id="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className="m-2 flex flex-col items-center">
                    <label htmlFor="opinion">Opinion</label>
                    <textarea className="rounded-lg resize-none bg-zinc-600" name="opinion" id="opinion" cols={60} rows={5} value={opinion} onChange={handleOpinionChange}></textarea>
                </div>
                <button className="m-2 px-4 py-2 rounded-full bg-emerald-600" type="submit" disabled={isMutating}>{isMutating ? "..." : "Publish"}</button>
            </form>
        </div>
    )
}