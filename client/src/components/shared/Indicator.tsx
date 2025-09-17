import React from 'react';
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io';
import { FaCircle } from 'react-icons/fa';
import { PaginationFunctionProps } from '@/types/global.dt';



function Indicators({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onGoToPage,
}: PaginationFunctionProps) {
  return (
    <div className='leftRightSpacing flex items-center justify-between mb-20'>

     <div className='flex gap-5'>

       <div className='w-20 h-5 bg-white rounded-full'/>

       <div className='flex items-center gap-3'>
        {[...Array(totalPages)].map((_, index) => (
          <FaCircle
            key={index}
            className={`cursor-pointer ${
              index === currentPage ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => onGoToPage(index)}
          />
        ))}
      </div>

     </div>





    <div className='flex items-center gap-5'>
    <div
        className={`flex items-center gap-5 text-2xl ${
          currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={currentPage === 0 ? undefined : onPrev}
      >
        <IoMdArrowBack />
      </div>


      <div
        className={`flex items-center gap-5 text-2xl ${
          currentPage === totalPages - 1
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        }`}
        onClick={currentPage === totalPages - 1 ? undefined : onNext}
      >
        <IoMdArrowForward />
      </div>

    </div>




    </div>
  );
}

export default Indicators