"use client"

import Link from 'next/link'
import { sideBarData } from '@/lib/data';
import Image from 'next/image'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import SidebarContent from '../common/SidebarContent';
import { useAuth } from '@/hooks/useAuth';





function Sidebar() {
  const pathname = usePathname();

  const router = useRouter();
  const {logOut} = useAuth()


  const handleLogout=async()=>{
     await logOut();
    router.push('/')
  }

  return (
    <div className='text-white text-3xl h-auto border border-l-0 border-b-0  border-t-0 border-[#212325]'> 
      <div className='flex flex-col justify-between h-full'> 
   

        <Link href="/" className='py-10 p-5'>
          <Image src="/images/entire_logo.svg" className='invert hidden lg:block' alt="" width={200} height={150}/>
        </Link>

       

        <div className='flex flex-col space-y-2 flex-grow'> 
          {sideBarData.map((data, index) => {
          const isActive = pathname.replace(/\/$/, '') === data.href.replace(/\/$/, '');
            
            return (
              <Link 
                key={index} 
                href={data.href} 
                className={clsx(
                  `flex items-center gap-3 px-3 py-2 transition-colors duration-200 rounded-[10px]`, 
                  { 'bg-white text-black mx-3 ': isActive } 
                )}
              >
               
                <div className="w-8 h-8 flex items-center justify-center">
                  <Image 
                    src={data.images} 
                    width={20} 
                    height={20} 
                    alt="logo" 
                    className={clsx("object-contain transition duration-200", {
                      "invert": isActive 
                    })}
                  />
                </div>

    
                <span className={clsx(
                  "hidden text-[16px] capitalize font-bold lg:block whitespace-nowrap flex-shrink-0", 
                  { "text-black": isActive }
                )}>
                  {data.name}
                </span>
              </Link>
            );
          })}
        </div>

   
        <div className='py-10'> 
          <SidebarContent onClick={handleLogout} text='logout' icon='/images/logout.svg' />
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
