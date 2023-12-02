import Image from "next/image";
export default function Product() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="tracing-wide text-3xl font-bold">Restaurant "El Globo"</h1>
            <Image src="/product.jpeg" width="400" height="400" alt="Product photo"/>
        </div>
    )
}