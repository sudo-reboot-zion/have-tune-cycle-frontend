import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";


function ArrowTextLink({name,href}:{name:string,href:string}) {
  return (
        <div className='flex items-center underline justify-center   gap-2 font-extrabold'>
            <Link href={href} className='font-outfit font-extralight text-[20px]  capitalize'>
                 {name}
                </Link>
                <MdArrowOutward className="text-2xl"/>
            </div>
        )
}

export default ArrowTextLink
