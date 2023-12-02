import Link from "next/link";
import Product from "../Product";
import Opinions from "./Opinions";

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Link className="absolute right-0 my-2 mx-4 py-2 px-4 rounded-full bg-teal-600" href={"/"}>Home Page</Link>
      <main className="w-[60vw] m-auto flex flex-col items-center gap-8">
        <h1 className="p-4 tracking-wide text-6xl">Admin Page</h1>
        <Product />
        <Opinions />
      </main>
    </div>
  )
};