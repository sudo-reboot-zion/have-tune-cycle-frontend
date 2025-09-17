'use client'

import Image from 'next/image';
import React from 'react';

type SidebarProps = {
    text: string;
    icon: string;
    onClick?: () => void;
};

function SidebarContent({ text, icon, onClick }: SidebarProps) {


  return (
    <div 
      className="flex items-center gap-3 px-3 cursor-pointer"
      onClick={onClick} 
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <Image src={icon} width={20} height={20} alt="logo" className="object-contain" />
      </div>

      <span className="hidden lg:block text-[18px] capitalize font-bold whitespace-nowrap flex-shrink-0">
        {text}
      </span>
    </div>
  );
}

export default SidebarContent;

