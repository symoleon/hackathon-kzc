import Image from 'next/image';
import Comments from './Comments';
import OpinionForm from './OpinionForm';
import Product from './Product';
export default function Home() {
  return (
    <div className="w-[60vw] m-auto flex flex-col items-center">
      <h1 className="m-8 tracking-wider text-6xl font-bold">Hackathon App</h1>
      <div className="m-4">
        <Product />
      </div>
      <div>
        <OpinionForm />
      </div>
      <div className="m-4">
        <Comments />
      </div>
    </div>
  )
}
