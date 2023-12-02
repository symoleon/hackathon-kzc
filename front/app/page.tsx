import Image from 'next/image';
import Link from 'next/link';
import Comments from './Comments';
import OpinionForm from './OpinionForm';
import Product from './Product';
export default function Home() {
  return (
    <div>
      <Link className="absolute right-0 my-2 mx-4 py-2 px-4 rounded-full bg-rose-600" href="/admin">Admin</Link>
      <main className="w-[60vw] m-auto flex flex-col items-center gap-8">
        <h1 className="p-4 tracking-wider text-6xl font-bold">Rankulator Recenzji</h1>
        <div>
          <Product />
        </div>
        <div>
          <OpinionForm />
        </div>
        <div>
          <Comments />
        </div>
      </main>
    </div>
    
  )
}
