import Image from "next/image"
import Link from "next/link"
import constants from "../../utils/constants"

export default function author({ fullName }) {
 

  return (
    <div className="author flex py-5">
        <Image src="/images/author/author1.jpg" width={60} height={60} className="rounded-full"></Image>        
        <div className="flex flex-col justify-center px-4">
            <Link href={"#"}><a className="text-md font-bold text-gray-800 hover:text-gray-600">{fullName || "No Name"}</a></Link>
            <span className="text-sm text-gray-500">"CEO"</span>
        </div>
    </div>
  )
}
