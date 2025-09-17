"use client";


import BuyerSidebar from '@/components/common/BuyerSideBar';
import React, { ReactNode} from 'react';


function Layout({ children }: { children: ReactNode }) {

  return (
    <React.Fragment>

        <div className='flex gap-20'>
          <div className='fixed top-0 left-0 h-dvh bg-[#101111] w-[80px] lg:w-[200px]'>
            <BuyerSidebar />
          </div>
          <div className='ml-[0rem] md:ml-[80px] lg:ml-[200px] flex-[90%] md:flex-[80%]'>
            {children}
          </div>
        </div>
    </React.Fragment>
  );
}

export default Layout;