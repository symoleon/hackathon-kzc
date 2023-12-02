interface Params {
    username: string;
    opinion: string;
}
export default function Comment({ username, opinion } : Params) {
    return (
        <div>
            <h3 className="font-bold">{username}</h3>
            <p className="pl-4 italic">{opinion}</p>
        </div>
    )
}