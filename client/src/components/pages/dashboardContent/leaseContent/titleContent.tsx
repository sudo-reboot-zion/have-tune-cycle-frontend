import React from 'react'


const columnLayout ="grid grid-cols-[50px_300px_220px_250px_250px_200px_150px_120px] items-center py-4 border-b border-gray-300";

function Titlecontent() {
  return (
        <div className="py-5">
         <div className={`${columnLayout} font-monoBold text-[16px] text-[#717A8C] capitalize`}>
           <div>#</div>
           <div>Songs</div>


           <div className="flex items-center gap-2">
             <h1>Leased By</h1>
           </div>

           <div className="flex items-center gap-1">
             <h1>Leased on</h1> 
           </div>

           <div>Due Date</div>
           <div>Duration</div>
           <div>Amount</div>
         </div>
         </div>
  )
}

export default Titlecontent