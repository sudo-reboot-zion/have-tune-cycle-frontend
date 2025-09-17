import React, { ReactNode } from 'react'

function IconAndText({icon,text}:{icon:ReactNode; text:string}) {
  return (
    <div className='flex items-center gap-3'>
         <span className='text-zinc-800'>{icon}</span>
         <p className='font-play_flaire'>{text}</p>
    </div>
  )
}

export default IconAndText